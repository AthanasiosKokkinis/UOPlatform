import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { launchImageLibrary, Asset } from "react-native-image-picker";
import { createPost } from "../../lib/supabase";
import { COLORS } from "../colors";

interface NewPostModalProps {
  visible: boolean;
  onClose: () => void;
  onCreated?: () => void;
}

export const NewPostModal = ({
  visible,
  onClose,
  onCreated,
}: NewPostModalProps) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [channel, setChannel] = useState("");
  const [image, setImage] = useState<Asset | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const reset = () => {
    setTitle("");
    setBody("");
    setChannel("");
    setImage(null);
    setSubmitting(false);
  };

  const close = () => {
    reset();
    onClose();
  };

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      selectionLimit: 1,
      quality: 0.8,
    });
    if (result.didCancel) return;
    if (result.errorMessage) {
      Alert.alert("Image picker error", result.errorMessage);
      return;
    }
    const asset = result.assets?.[0];
    if (asset) setImage(asset);
  };

  const submit = async () => {
    if (!title.trim()) {
      Alert.alert("Title required");
      return;
    }
    setSubmitting(true);
    try {
      await createPost({
        title: title.trim(),
        body: body.trim() || undefined,
        imageUri: image?.uri ?? null,
        channel: channel.trim() || undefined,
      });
      onCreated?.();
      close();
    } catch (err: any) {
      Alert.alert("Failed to post", err?.message ?? "Unknown error");
      setSubmitting(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={close}
    >
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <TouchableOpacity onPress={close}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.title}>New Post</Text>
            <TouchableOpacity onPress={submit} disabled={submitting}>
              {submitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.post}>Post</Text>
              )}
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.body}>
            <TextInput
              style={styles.input}
              placeholder="Channel (optional)"
              placeholderTextColor="#888"
              value={channel}
              onChangeText={setChannel}
            />
            <TextInput
              style={styles.input}
              placeholder="Title"
              placeholderTextColor="#888"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={[styles.input, styles.bodyInput]}
              placeholder="What's on your mind? (optional)"
              placeholderTextColor="#888"
              value={body}
              onChangeText={setBody}
              multiline
            />

            <TouchableOpacity style={styles.imageBtn} onPress={pickImage}>
              <Text style={styles.imageBtnText}>
                {image ? "Change image" : "Add image (optional)"}
              </Text>
            </TouchableOpacity>

            {image?.uri && (
              <View style={styles.previewWrap}>
                <Image source={{ uri: image.uri }} style={styles.preview} />
                <TouchableOpacity
                  style={styles.removeImage}
                  onPress={() => setImage(null)}
                >
                  <Text style={{ color: "#fff" }}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#1c1c1c",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "90%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#2a2a2a",
  },
  title: { color: "#fff", fontSize: 16, fontWeight: "600" },
  cancel: { color: "#aaa", fontSize: 15 },
  post: { color: COLORS.active ?? "#9e2e41", fontSize: 15, fontWeight: "700" },
  body: { padding: 16, gap: 12 },
  input: {
    backgroundColor: "#2a2a2a",
    color: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
  },
  bodyInput: { minHeight: 120, textAlignVertical: "top" },
  imageBtn: {
    backgroundColor: "#2a2a2a",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  imageBtnText: { color: "#fff" },
  previewWrap: { position: "relative" },
  preview: { width: "100%", height: 200, borderRadius: 10 },
  removeImage: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
});
