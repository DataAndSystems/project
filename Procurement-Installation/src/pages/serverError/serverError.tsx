import React, { useEffect } from 'react';
import utils from '../../utils/utils';
import styles from './serverError.module.scss';

function ServerError(props: any) {

    useEffect(() => {
        //设置网页title
        document.title = '服务器错误';
    }, [])

    const onclickGoHome = () => {
        props.history.replace('/home')
    }

    return (
        <div className={styles.serverError_content}>
            <p>
                <span>5</span>
                <span>0</span>
                <span>0</span>
            </p>
            <div className={styles.text}>
                服务器错误！请联系管理员！
            </div>
            <div className={styles.goHome}>
                <div className={styles.btn} onClick={onclickGoHome}>
                    回到首页
                </div>
            </div>
        </div>
    )

}

export default ServerError;