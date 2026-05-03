import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal = ({
  visible,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.backdrop}>
        <View style={styles.dialog}>
          <Text style={styles.title}>{title}</Text>
          {!!message && <Text style={styles.message}>{message}</Text>}
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.btn} onPress={onCancel}>
              <Text style={styles.cancel}>{cancelLabel}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={onConfirm}>
              <Text style={[styles.confirm, destructive && styles.destructive]}>
                {confirmLabel}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  dialog: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#222",
    borderRadius: 14,
    padding: 18,
  },
  title: { color: "#fff", fontSize: 17, fontWeight: "600", marginBottom: 8 },
  message: { color: "#bbb", fontSize: 14, lineHeight: 20, marginBottom: 16 },
  buttons: { flexDirection: "row", justifyContent: "flex-end", gap: 18 },
  btn: { paddingVertical: 8, paddingHorizontal: 8 },
  cancel: { color: "#aaa", fontSize: 15 },
  confirm: { color: "#9e2e41", fontSize: 15, fontWeight: "700" },
  destructive: { color: "#ef4444" },
});
