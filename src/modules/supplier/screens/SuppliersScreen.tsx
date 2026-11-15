import React, { useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Plus, Truck } from "lucide-react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSuppliers } from "@modules/supplier/hooks/useSuppliers";
import { supplierApi } from "@modules/supplier/api/supplierApi";
import { Supplier } from "@modules/supplier/types";
import { useAuthStore } from "@shared/store/useAuthStore";
import { PERMISSIONS } from "@shared/permissions";
import {
  Screen,
  Text,
  VStack,
  HStack,
  Card,
  Button,
  ListRow,
  SearchInput,
  ChipsRow,
  Pagination,
  DataTable,
  Column,
  Skeleton,
  ErrorState,
} from "@shared/ui";
import { fmtCount, fmtMoneyExact } from "@shared/format";

const money = fmtMoneyExact;

export default function SuppliersScreen() {
  const navigation = useNavigation<any>();
  const canWrite = useAuthStore((s) => s.hasPermission)(
    PERMISSIONS.SUPPLIERS_MANAGE,
  );
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);

  // Filter change → back to page 1 (adjusted during render, not in an effect).
  // Deactivated suppliers are hidden everywhere else; this is the way back.
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const filterKey = `${search}|${limit}|${status}`;
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey);
  if (filterKey !== prevFilterKey) {
    setPrevFilterKey(filterKey);
    setPage(1);
  }

  const { data, isLoading, isError, error, refetch, isRefetching } =
    useSuppliers({
      ...(search.trim() ? { search: search.trim() } : {}),
      page,
      limit,
      status,
    });
  const suppliers = data?.data ?? [];
  const total = data?.meta?.total ?? 0;
  const totalPages = data?.meta?.pages ?? 1;

  if (!isLoading && totalPages > 0 && page > totalPages) setPage(totalPages);

  const qc = useQueryClient();
  const restoreMut = useMutation({
    mutationFn: (id: string) => supplierApi.restore(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["suppliers"] }),
  });
  // A deactivated supplier has no detail page, so its row reactivates it.
  const open = (s: Supplier) =>
    status === "inactive"
      ? canWrite && restoreMut.mutate(s.id)
      : navigation.navigate("SupplierDetail", { id: s.id });

  const columns: Column<Supplier>[] = [
    {
      key: "name",
      header: "Name",
      width: 220,
      sortable: true,
      sortValue: (s) => s.name.toLowerCase(),
      render: (s) => (
        <Text variant="label" tone="primary" numberOfLines={1}>
          {s.name}
        </Text>
      ),
    },
    {
      key: "contactPerson",
      header: "Contact",
      width: 180,
      sortable: true,
      sortValue: (s) => (s.contactPerson || "").toLowerCase(),
      render: (s) => (
        <Text variant="body-sm" tone="secondary" numberOfLines={1}>
          {s.contactPerson || "—"}
        </Text>
      ),
    },
    {
      key: "mobile",
      header: "Mobile",
      width: 150,
      render: (s) => (
        <Text variant="body-sm" tone="secondary">
          {s.mobile || "—"}
        </Text>
      ),
    },
    {
      key: "purchases",
      header: "Purchases",
      width: 150,
      align: "right",
      sortable: true,
      sortValue: (s) => s.purchases?.value ?? 0,
      render: (s) =>
        s.purchases && s.purchases.count > 0 ? (
          <VStack gap={1} align="flex-end">
            <Text variant="label" tone="primary">
              {money(s.purchases.value)}
            </Text>
            <Text variant="caption" tone="tertiary">
              {s.purchases.count} order{s.purchases.count === 1 ? "" : "s"}
            </Text>
          </VStack>
        ) : (
          <Text variant="body-sm" tone="tertiary">
            —
          </Text>
        ),
    },
  ];

  return (
    <Screen
      overline="Partners"
      title="Suppliers"
      subtitle={isError ? undefined : fmtCount(total, "supplier")}
      refreshing={isRefetching || isLoading}
      onRefresh={refetch}
      right={
        canWrite ? (
          <Button
            label="Add supplier"
            fullWidth={false}
            icon={<Plus size={18} color="#FFFFFF" strokeWidth={2.2} />}
            onPress={() => navigation.navigate("SupplierForm")}
          />
        ) : undefined
      }
    >
      <SearchInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search supplier"
      />

      <View style={{ marginTop: 10 }}>
        <ChipsRow
          chips={[
            { key: "active", label: "Active" },
            { key: "inactive", label: "Deactivated" },
          ]}
          active={status}
          onChange={(k: string) => setStatus(k as "active" | "inactive")}
        />
      </View>
      {status === "inactive" && canWrite && suppliers.length > 0 ? (
        <Text variant="body-sm" tone="secondary" style={{ marginTop: 10 }}>
          Select a supplier to reactivate it.
        </Text>
      ) : null}

      {isError ? (
        <ErrorState
          error={error}
          title="Couldn't load your suppliers"
          onRetry={() => refetch()}
          retrying={isRefetching}
          style={{ marginTop: 16 }}
        />
      ) : isLoading && suppliers.length === 0 ? (
        <ListSkeleton />
      ) : (
        <View style={{ marginTop: 16 }}>
          <DataTable<Supplier>
            columns={columns}
            rows={suppliers}
            keyExtractor={(s) => s.id}
            onRowPress={open}
            mobileCard={(s) => (
              <SupplierRow supplier={s} onPress={() => open(s)} />
            )}
            emptyIcon={Truck}
            emptyTitle="No suppliers yet"
            emptyMessage="Add suppliers to record purchases and track supplied products."
          />
          {suppliers.length > 0 ? (
            <View style={{ marginTop: 16 }}>
              <Pagination
                page={page}
                totalPages={totalPages}
                total={total}
                limit={limit}
                onPageChange={setPage}
                onLimitChange={setLimit}
                label="suppliers"
              />
            </View>
          ) : null}
        </View>
      )}
    </Screen>
  );
}

function ListSkeleton() {
  return (
    <VStack gap={12} style={{ marginTop: 16 }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Card key={i} elevation="base">
          <HStack gap={14} align="center">
            <Skeleton width={46} height={46} rounded="full" />
            <VStack gap={6} flex={1}>
              <Skeleton width="45%" height={16} />
              <Skeleton width="60%" height={12} />
            </VStack>
          </HStack>
        </Card>
      ))}
    </VStack>
  );
}

function SupplierRow({
  supplier,
  onPress,
}: {
  supplier: Supplier;
  onPress: () => void;
}) {
  // GSTIN is an identifier, not a status — it joins the contact line rather
  // than taking a chip of its own on every row.
  return (
    <ListRow
      title={supplier.name}
      subtitle={
        [supplier.contactPerson, supplier.mobile, supplier.gstin]
          .filter(Boolean)
          .join(" · ") || "No contact"
      }
      onPress={onPress}
    />
  );
}
