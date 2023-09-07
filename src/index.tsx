import {Text} from 'ink';
import terminalImage from 'terminal-image';
import React, {useState, useEffect} from 'react';
import {fileTypeFromBuffer, fileTypeFromFile} from 'file-type';

type InkImgProps = {
	alt?: string;
	src: string | Buffer;
	width?: number | string;
	height?: number | string;
	preserveAspectRatio?: boolean;
	maxFrameRate?: number;
};

const GIF = 'gif';

const InkImg = ({
	src,
	alt,
	width = '100%',
	height = '100%',
	preserveAspectRatio = true,
	maxFrameRate = 30,
}: InkImgProps) => {
	const [imageBuffer, setImageBuffer] = useState();

	useEffect(() => {
		let isPlaying = true;

		const mountImage = async () => {
			if (
				Buffer.isBuffer(src) &&
				(await fileTypeFromBuffer(src))?.ext === GIF
			) {
				const stopAnimation = terminalImage.gifBuffer(src, {
					height,
					width,
					maximumFrameRate: maxFrameRate,
					renderFrame: data => {
						if (isPlaying) {
							setImageBuffer(data);
						} else {
							stopAnimation();
						}
					},
				});
			} else if ((await fileTypeFromFile(src as string))?.ext === GIF) {
				const stopAnimation = terminalImage.gifFile(src as string, {
					height,
					width,
					maximumFrameRate: maxFrameRate,
					renderFrame: data => {
						if (isPlaying) {
							setImageBuffer(data);
						} else {
							stopAnimation();
						}
					},
				});
			} else {
				const data = await terminalImage.file(src as string, {
					width,
					height,
					preserveAspectRatio,
				});

				setImageBuffer(data);
			}
		};

		mountImage();

		return () => {
			isPlaying = false;
		};
	}, [src]);

	return <Text>{imageBuffer || alt}</Text>;
};

export default InkImg;
