import React, { useEffect } from 'react';
import utils from '../../utils/utils';
import styles from '../notFound/notFound.module.scss';

function NotFound(props: any) {

    useEffect(() => {
        //设置网页title
        document.title = '404';
    }, [])

    const onclickGoHome = () => {
        props.history.replace('/home')
    }

    return (
        <div className={styles.notFound_content}>
            <p>
                <span>4</span>
                <span>0</span>
                <span>4</span>
            </p>
            <div className={styles.text}>
                父应用页面找不到了(´･ω･`)
            </div>
            <div className={styles.goHome}>
                <div className={styles.btn} onClick={onclickGoHome}>
                    回到首页
                </div>
            </div>
        </div>
    )

}

export default NotFound;