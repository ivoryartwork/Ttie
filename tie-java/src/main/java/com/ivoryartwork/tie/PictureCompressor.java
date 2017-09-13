package com.ivoryartwork.tie;

import com.sun.image.codec.jpeg.JPEGCodec;
import com.sun.image.codec.jpeg.JPEGImageEncoder;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * 图片压缩器
 *
 * @author Yaochao
 * @version 1.0
 * @date 2017/9/12
 */
public class PictureCompressor {


    /**
     * @param srcPic  源图片路径
     * @param destPic 缩放之后图片路径
     * @param rate    缩放比例 0-1
     * @throws IOException
     */
    public void compress(String srcPic, String destPic, float rate) throws Exception {
        if ((rate <= 0 && rate > 1)) {
            throw new IllegalArgumentException("缩放比例应该大于0小于等于1");
        }
        if (srcPic == null) {
            throw new NullPointerException("srcPic不能为null");
        }
        if (destPic == null) {
            throw new NullPointerException("destPic不能为null");
        }
        File srcFile = new File(srcPic);
        if (!srcFile.exists()) {
            throw new FileNotFoundException("源图片未找到。");
        }
        Image img = ImageIO.read(new File(srcPic));
        int width = img.getWidth(null);
        int height = img.getHeight(null);

        int newWidth = (int) (width * rate);
        int newHeight = (int) (height * rate);
        BufferedImage tag = new BufferedImage(newWidth, newHeight, BufferedImage.TYPE_INT_RGB);
        tag.getGraphics().drawImage(img.getScaledInstance(newWidth, newHeight, Image.SCALE_SMOOTH), 0, 0, null);
        FileOutputStream out = new FileOutputStream(destPic);
        JPEGImageEncoder imageEncoder = JPEGCodec.createJPEGEncoder(out);
        imageEncoder.encode(tag);
        out.close();
    }

    public static void main(String[] args) {
        PictureCompressor compressor = new PictureCompressor();
        try {
            compressor.compress("E:\\src.jpg", "E:\\dest.jpg", 0.1f);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}