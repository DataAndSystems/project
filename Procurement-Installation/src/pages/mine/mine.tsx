
import React, { useState, useEffect } from 'react';
import { Flex, WhiteSpace } from 'antd-mobile';
import styles from './mine.module.scss';
import { Link } from 'react-router-dom';

function Mine(props: any) {

    useEffect(() => {

    }, [])


    return (
        <div className={styles.guide_content} id="vueContainer">
            <Link to={`/toolsVue`}>测试：跳转vue子应用</Link>
        </div>
    )
}
export default Mine;