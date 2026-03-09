import React from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";

type Props = {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
  colors: {
    background: string;
    primary: string;
    titleText: string;
    bodyText: string;
    border: string;
  };
};

export default function SimpleModal({
  visible,
  title,
  message,
  onClose,
  colors,
}: Props) {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View
          style={[
            styles.modal,
            {
              backgroundColor: colors.background,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.title, { color: colors.titleText }]}>
            {title}
          </Text>

          <Text style={[styles.message, { color: colors.bodyText }]}>
            {message}
          </Text>

          <Pressable
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>OK</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "80%",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  message: {
    fontSize: 15,
    marginBottom: 20,
  },
  button: {
    alignSelf: "flex-end",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
});