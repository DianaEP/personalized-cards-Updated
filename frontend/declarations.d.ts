declare module "*.svg" {
    import React from "react";
    import { SvgProps } from "react-native-svg";
    const content: React.FC<SvgProps>;
    export default content;
  }

// FileSystem augmentation
declare module 'expo-file-system' {
  export interface FileSystemMoveOptions {
    from: string;
    to: string;
  }

  export const documentDirectory: string | null;

  export function moveAsync(options: FileSystemMoveOptions): Promise<void>;
}