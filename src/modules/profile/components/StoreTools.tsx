import React, { useState } from "react";
import { Platform } from "react-native";
import { useMutation } from "@tanstack/react-query";
import { DatabaseBackup } from "lucide-react-native";
import { apiErrorMessage } from "@api/apiClient";
import { profileApi } from "@modules/profile/api/profileApi";
import { getBillPrinter, setBillPrinter } from "@shared/print";
import { palette } from "@shared/designSystem";
import { Text, VStack, Card, Button, TextField } from "@shared/ui";

/**
 * Which printer THIS machine sends text bills to. Per machine, not per store —
 * it names hardware on this counter — so it lives in the browser beside the
 * label-printer choice, and only shows where the desktop app can use it.
 */
function BillPrinterCard() {
  const [value, setValue] = useState(() => getBillPrinter() || "");
  if (Platform.OS !== "web") return null;
  return (
    <>
      <Text variant="h3" tone="primary" style={{ marginBottom: 12 }}>
        Printing on this PC
      </Text>
      <Card style={{ marginBottom: 24 }}>
        <VStack gap={6}>
          <TextField
            label="Dot-matrix printer on this PC (desktop app only)"
            value={value}
            onChangeText={(v) => {
              setValue(v);
              setBillPrinter(v);
            }}
            placeholder="\\\\localhost\\LX310  or  LPT1"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text variant="caption" tone="tertiary">
            Share the printer in Windows (Printer properties → Sharing) and
            enter \\localhost\ShareName, or the port it is on. Bills then print
            as plain text in seconds. Leave empty to print through the normal
            print dialog.
          </Text>
        </VStack>
      </Card>
    </>
  );
}

/** Emails the store's data archive. The address is set on the server. */
function BackupCard() {
  const mut = useMutation({ mutationFn: () => profileApi.emailBackup() });
  const full = useMutation({ mutationFn: () => profileApi.runFullBackup() });
  return (
    <>
      <Text variant="h3" tone="primary" style={{ marginBottom: 12 }}>
        Data backup
      </Text>
      <Card style={{ marginBottom: 24 }}>
        <VStack gap={12}>
          <Text variant="body-sm" tone="secondary">
            Emails a copy of the store&apos;s data to the store&apos;s backup
            address. It can take a minute or two.
          </Text>
          <Button
            label="Email my backup"
            variant="secondary"
            icon={
              <DatabaseBackup
                size={18}
                color={palette.text.primary}
                strokeWidth={1.8}
              />
            }
            loading={mut.isPending}
            onPress={() => mut.mutate()}
          />
          {mut.isSuccess && (
            <Text variant="caption" tone="success">
              Backup sent to {mut.data.emailedTo}.
            </Text>
          )}
          {mut.isError && (
            <Text variant="caption" tone="danger">
              {apiErrorMessage(mut.error)}
            </Text>
          )}

          <Text variant="body-sm" tone="secondary">
            The server also makes a full backup every night. Run it now before
            a risky change, or to check that backups are working.
          </Text>
          <Button
            label="Run full backup now"
            variant="secondary"
            loading={full.isPending}
            onPress={() => full.mutate()}
          />
          {full.isSuccess && (
            <Text variant="caption" tone="success">
              Backup completed: {full.data.destination}.
            </Text>
          )}
          {full.isError && (
            <Text variant="caption" tone="danger">
              {apiErrorMessage(full.error)}
            </Text>
          )}
        </VStack>
      </Card>
    </>
  );
}

/** What used to live on the Settings page and is not store configuration. */
export function StoreTools({ isAdmin }: { isAdmin: boolean }) {
  return (
    <>
      <BillPrinterCard />
      {isAdmin ? <BackupCard /> : null}
    </>
  );
}
