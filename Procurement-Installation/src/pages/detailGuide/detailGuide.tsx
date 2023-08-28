/*
 * @Author: your name
 * @Date: 2021-08-17 16:44:10
 * @LastEditTime: 2021-08-18 15:54:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project\srm-gauge-miniprogram\src\pages\detailGuide\detailGuide.tsx
 */

import React, { useState, useEffect } from 'react';
import { Modal, List, Button, WhiteSpace, WingBlank, Icon, InputItem, Toast } from 'antd-mobile';
import styles from './detailGuide.module.scss';
import { Link } from 'react-router-dom';
import BtnBg from 'static/images/btn_bg.png';
import PreviewIcon from 'static/images/preview_icon.png';
import ShareIcon from 'static/images/share_icon.png';
import Upload from 'static/images/upload.png';
import Email from 'static/images/email.png';
import { reduce } from 'bluebird';
import copy from 'copy-to-clipboard'


function DetailGuide(props: any) {
    const [detail, setDetail] = useState<any>({
        title:'2019 CBCS指南PDF版: 产科多普勒测速 的应用(更新版)',
        time:'2021-07-19',
        content:'2021年7月，国际妇产科超声学会(ISUOG)更新 发布了产科多普勒测速的应用指南，本文主要针 对胎盘循环的多普勒超声检查提供指导建议。'
    })
    //下载弹出层
    const [uploadFlag, setUploadFlag] = useState(false)
    //发送邮箱弹出层
    const [emailFlag, setEmailFlag] = useState(false)
    //错误邮箱提示
    const [emailError, setEmailError] = useState('请输入正确的邮箱地址')
    //发送邮箱弹出层
    const [emailValue, setEmailValue] = useState('')
    //链接内容
    const [linkContent, serLinkContent] = useState('https://www.iconfont.c…')
    
    useEffect(() => {

    }, [])
    const changeEamailHandler=(value:any)=>{
        setEmailValue(value)
        console.log(value)
    }

    return (
        <div className={styles.detail_guide_content} id="">
            <div className={styles.detail_title}>{detail.title}</div>
            <div className={styles.detail_time}>版本发布于：{detail.time}</div>
            <div className={styles.detail_line}></div>
            <div className={styles.detail_content}>{detail.content}</div>
            <div className={styles.detail_btn_warp}>
                <div className={styles.preview}>
                    <img src={BtnBg} alt="" className={styles.btn_bg} />
                    <img src={PreviewIcon} alt="" className={styles.preview_icon} />
                    <div className={styles.preview_title}>预览</div>
                </div>
                <div className={styles.share}>
                    <img src={BtnBg} alt="" className={styles.btn_bg} />
                    <img src={ShareIcon} alt="" className={styles.share_icon} />
                    <div className={styles.share_title}>分享</div>
                </div>
            </div>
            <div className={styles.bottom_warp}>
                <span className={styles.upload_warp} onClick={() => { setUploadFlag(true) }}>
                    <img src={Upload} alt="" className={styles.upload_icon}/>
                    下载资料
                </span>
                <span className={styles.email_warp} onClick={() => { setEmailFlag(true) }}>
                    <img src={Email} alt="" className={styles.email_icon}/>
                    发送到邮箱
                </span>
            </div>
            <WhiteSpace />
            <Modal
                visible={uploadFlag}
                transparent
                maskClosable={false}
                onClose={()=>{setUploadFlag(false)}}
                title="PDF下载"
                closable = {true}
                footer={[{ text: '复制链接去浏览器打开', onPress: () => { 
                    setUploadFlag(false)
                    console.log('复制成功')
                    copy(linkContent)
                    Toast.info('复制成功', 1); } }]}
                >
                <div style={{ height: 120, overflow: 'scroll' }}>
                    <p style={{color: '#888888',fontSize: '15px'}}>点击下方按钮使用浏览器打开</p>
                    <p style={{background: '#F5F5F5',height:'50px',lineHeight:"50px"}}>{linkContent}</p>
                </div>
            </Modal>
            <WhiteSpace />
            <Modal
                visible={emailFlag}
                transparent
                maskClosable={false}
                onClose={()=>{setEmailFlag(false)}}
                title="填写邮箱地址"
                closable = {true}
                footer={[
                    { text: '取消', onPress: () => { setEmailFlag(false) } },
                    { text: '发送', onPress: () => { setEmailFlag(false) } },
            ]}
                //   wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                //   afterClose={() => { alert('afterClose'); }}
                >
                <div style={{ height: 100, overflow: 'scroll' }}>
                    {/* <p style={{background: '#F5F5F5',height:'50px',lineHeight:"50px"}}> */}
                        <InputItem
                            placeholder="输入邮箱地址"
                            // error={emailError}
                            // onErrorClick={this.onErrorClick}
                            style ={{ background:'#F5F5F5',height:'50px',lineHeight:"50px"}}
                            onChange={(value)=>changeEamailHandler(value)}
                            value={emailValue}
                        ></InputItem>
                    {/* </p> */}
                    <p style={{ color:'red' }}>请输入正确的邮箱地址</p>
                </div>
            </Modal>
        </div>
    )
}
export default DetailGuide;