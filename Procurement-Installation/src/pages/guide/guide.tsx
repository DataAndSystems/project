/*
 * @Author: your name
 * @Date: 2021-08-16 13:36:34
 * @LastEditTime: 2021-08-17 17:29:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project\srm-gauge-miniprogram\src\pages\guide\guide.tsx
 */
import React, { useState, useEffect } from 'react';
import { Flex, WhiteSpace } from 'antd-mobile';
import styles from './guide.module.scss';
import { Link } from 'react-router-dom';

function Guide(props: any) {

    useEffect(() => {

    }, [])


    return (
        <div className={styles.guide_content} id="">
            <Link to={`/toolsVue`}>测试：跳转vue子应用</Link>
        </div>
    )
}
export default Guide;