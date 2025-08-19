export type FileUploadTypes = "pdf" | "image" | "picture";

export interface FileUploadResponseProps {
  success: boolean;
  poster: [
    {
      url: string;
      file: string;
    },
  ];
  media: {
    id: number;
    mediaType: "video";
    fileName: string;
    name: string;
    description: string;
    fileFullUrl: string;
    thumbnail: string;
    thumbnailFullUrl: string;
    fileSize: number;
    fileExtension: string;
    isCache: boolean;
  };
}

export type ChunkPendingStateProps = {
  status: "pending";
  progress: number;
  progressId: string;
  file: File;
};

export type ChunkInProgressStateProps = {
  status: "in_progress";
  progress: number;
  progressId: string;
  file: File;
};

export type ChunkCompletedStateProps = {
  status: "completed";
  progress: number;
  progressId: string;
  response: FileUploadResponseProps;
  file: File;
};

export type ChunkErrorStateProps = {
  status: "error";
  reason: string;
  progress: number;
  progressId: string;
  file: File;
};

export type ChunkStateProps =
  | ChunkPendingStateProps
  | ChunkInProgressStateProps
  | ChunkCompletedStateProps
  | ChunkErrorStateProps;
export type SingleFileUploadState =
  | ChunkCompletedStateProps
  | ChunkInProgressStateProps
  | ChunkErrorStateProps;
