/// <reference types="node" />
type InkImgProps = {
    alt?: string;
    src: string | Buffer;
    width?: number | string;
    height?: number | string;
    preserveAspectRatio?: boolean;
    maxFrameRate?: number;
};
declare const InkImg: ({ src, alt, width, height, preserveAspectRatio, maxFrameRate, }: InkImgProps) => any;
export default InkImg;
