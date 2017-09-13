package com.ivoryartwork.tie.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * @author Yaochao
 * @version 1.0
 * @date 2017/9/13
 */
@Controller
@RequestMapping("/img")
public class ImgController {

    /**
     * 上传图片
     */
    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public void upload(@RequestParam MultipartFile img, @RequestParam String imgName) throws IOException {

    }

    /**
     * 获取图片
     *
     * @param imgId
     */
    @RequestMapping(value = "/{imgId}", method = RequestMethod.GET)
    public void getImg(@PathVariable String imgId) {

    }
}
