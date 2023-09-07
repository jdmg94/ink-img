function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
import { Text } from 'ink';
import terminalImage from 'terminal-image';
import React, { useState, useEffect } from 'react';
import { fileTypeFromBuffer, fileTypeFromFile } from 'file-type';
const GIF = 'gif';
const InkImg = ({ src, alt, width = '100%', height = '100%', preserveAspectRatio = true, maxFrameRate = 30 })=>{
    const [imageBuffer, setImageBuffer] = useState();
    useEffect(()=>{
        let isPlaying = true;
        const mountImage = function() {
            var _ref = _async_to_generator(function*() {
                var _this, _this1;
                if (Buffer.isBuffer(src) && ((_this = yield fileTypeFromBuffer(src)) === null || _this === void 0 ? void 0 : _this.ext) === GIF) {
                    const stopAnimation = terminalImage.gifBuffer(src, {
                        height,
                        width,
                        maximumFrameRate: maxFrameRate,
                        renderFrame: (data)=>{
                            if (isPlaying) {
                                setImageBuffer(data);
                            } else {
                                stopAnimation();
                            }
                        }
                    });
                } else if (((_this1 = yield fileTypeFromFile(src)) === null || _this1 === void 0 ? void 0 : _this1.ext) === GIF) {
                    const stopAnimation = terminalImage.gifFile(src, {
                        height,
                        width,
                        maximumFrameRate: maxFrameRate,
                        renderFrame: (data)=>{
                            if (isPlaying) {
                                setImageBuffer(data);
                            } else {
                                stopAnimation();
                            }
                        }
                    });
                } else {
                    const data = yield terminalImage.file(src, {
                        width,
                        height,
                        preserveAspectRatio
                    });
                    setImageBuffer(data);
                }
            });
            return function mountImage() {
                return _ref.apply(this, arguments);
            };
        }();
        mountImage();
        return ()=>{
            isPlaying = false;
        };
    }, [
        src
    ]);
    return /*#__PURE__*/ React.createElement(Text, null, imageBuffer || alt);
};
export default InkImg;
