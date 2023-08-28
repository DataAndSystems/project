import React, { useState, useEffect } from 'react';
import { Flex, Tabs } from 'antd-mobile';
import styles from './tools.module.scss';
import { Link, useHistory } from 'react-router-dom';
import { createFromIconfontCN } from '@ant-design/icons';
import { ApiCore } from '../../api';

const api = new ApiCore();

//设置阿里图库地址
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2669856_zklnetnt4f.js',
});

function Tools(props: any) {
    const history = useHistory()

    const [tabBar, setTabBar] = useState<any>([])
    const [tabContent, setTabContent] = useState<any>([])

    let adaConduit = 'https://huimei-edc.oss-cn-shanghai.aliyuncs.com/scale/icon/dgywa.svg'
    let adaJrxa = 'https://huimei-edc.oss-cn-shanghai.aliyuncs.com/scale/icon/jrxa.svg'
    let imgVNPI = 'https://huimei-edc.oss-cn-shanghai.aliyuncs.com/scale/icon/vnpi.svg'
    let imgCTS = 'https://huimei-edc.oss-cn-shanghai.aliyuncs.com/scale/icon/cts5.svg'
    let laterTree = 'https://huimei-edc.oss-cn-shanghai.aliyuncs.com/scale/icon/laterTree.svg'
    let imgProsthesis = 'https://huimei-edc.oss-cn-shanghai.aliyuncs.com/scale/icon/prosthesis.svg'
    let imgSTEPP = 'https://huimei-edc.oss-cn-shanghai.aliyuncs.com/scale/icon/stepp.svg'
    let imgArea = 'https://huimei-edc.oss-cn-shanghai.aliyuncs.com/scale/icon/area.svg'
    let imgRisk = 'https://huimei-edc.oss-cn-shanghai.aliyuncs.com/scale/icon/risk.svg'
    let imgChemotherapy = 'https://huimei-edc.oss-cn-shanghai.aliyuncs.com/scale/icon/chemotherapy.svg'
    let imgTNM = 'https://huimei-edc.oss-cn-shanghai.aliyuncs.com/scale/icon/tnm.svg'
    let imgRCB = 'https://huimei-edc.oss-cn-shanghai.aliyuncs.com/scale/icon/rcb.svg'
    let imgOPS = 'https://huimei-edc.oss-cn-shanghai.aliyuncs.com/scale/icon/ops.svg'
    let imgGailModel = 'https://huimei-edc.oss-cn-shanghai.aliyuncs.com/scale/icon/gailmodel.svg'
    let helpTree = 'https://huimei-edc.oss-cn-shanghai.aliyuncs.com/scale/icon/helptrees.svg'
    let newTree = 'https://huimei-edc.oss-cn-shanghai.aliyuncs.com/scale/icon/newtrees.svg'
    let BreastQ = 'https://huimei-edc.oss-cn-shanghai.aliyuncs.com/scale/icon/breastQ.svg'
    let newTreeAfter = 'https://huimei-edc.oss-cn-shanghai.aliyuncs.com/scale/icon/newTreeAfter.svg'
    let fudanType = 'https://huimei-edc.oss-cn-shanghai.aliyuncs.com/scale/icon/fudanType.svg'
    let eortc = 'https://huimei-edc.oss-cn-shanghai.aliyuncs.com/scale/icon/eortc.svg'
    let imgAdjuntOnline = 'https://huimei-edc.oss-cn-shanghai.aliyuncs.com/scale/icon/adjuntonline.svg'
    

    const IconList = [
        [imgTNM, imgVNPI, imgRisk, imgArea, imgChemotherapy, imgProsthesis,
            imgSTEPP, imgCTS, imgAdjuntOnline, imgRCB, imgOPS, imgGailModel, fudanType],
        [helpTree, newTree, newTreeAfter, laterTree, adaConduit, adaJrxa],
        [BreastQ, eortc]
    ]

    /**
     * 获取量表信息
     */
    const getScaleInfo = () => {
        api.GetScaleInfo().then(res => {
            if (res && res.data) {
                setTabBar(res.data.tabBar)
                setTabContent(res.data.tabContent)
            }
        })
    }

    useEffect(() => {
        //设置网页title
        // document.title = '小工具';
        getScaleInfo()
    }, [])

    /**
     * 修改underline
     */
    const onTabClick = (tab: any, index: any) => {

        let underline = document.querySelectorAll(".am-tabs-default-bar-underline") as NodeListOf<HTMLElement>;
        if (index == 0) {
            underline[0].style.left = '15%';
        } else if (index == 1) {
            underline[0].style.left = '48%';
        } else if (index == 2) {
            underline[0].style.left = '82%';
        }
    }

    const toScale = (item: any) => {
        console.log('toScale', item, localStorage.getItem('userInfo'))
        let userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
        if (userInfo && userInfo.memberType == 2) {
            if (item.code === 'S018' || item.code === 'S021') {
                history.push(`/miniQuestionDoctor/questionList/${item.code}`);
            } else {
                history.push(`/scale/evaluation/${item.code}`);
            }
        } else {
            props.toBeDoctor(item)
        }
    }

    return (
        <div className={styles.Tools_content}>
            <div className={styles.bg}></div>
            <div className={styles.tabs}>
                <Tabs tabs={tabBar}
                    initialPage={0}
                    onTabClick={(tab, index) => onTabClick(tab, index)}
                    tabBarBackgroundColor='transparent'
                    tabBarTextStyle={{ fontSize: 16 }}
                    tabBarUnderlineStyle={{ borderColor: '#fff', left: '15%' }}
                    tabBarActiveTextColor='rgba(255, 255, 255, 1)'
                    tabBarInactiveTextColor='rgba(255, 255, 255, 0.5)'
                    useOnPan={false}
                    swipeable={false}
                >

                    {
                        tabContent.map((tabItem: any, tabIndex: any) => (
                            <Flex wrap="wrap" justify='between' key={tabIndex}>
                                {
                                    tabItem.map((item: any, index: any) => (
                                        <div key={index}
                                            className={tabIndex == 0 ? `${styles.item} ${styles.tools}` : `${styles.item} ${styles.ada}`} onClick={() => toScale(item)}>
                                            {/* <Link to={`/scale/evaluation/${item.code}`} className={styles.itemColor}> */}
                                            <div className={styles.itemColor}>
                                                <img
                                                    src={IconList[tabIndex][index]}
                                                    alt=''
                                                    width={tabIndex == 0 ? '60%' : '35%'}
                                                />
                                                <div className={styles.text}>{item.title}</div>
                                            </div>
                                            {/* </Link> */}
                                        </div>
                                    ))
                                }
                            </Flex>
                        ))
                    }
                </Tabs>
                <div className={styles.footer}>- 中国抗癌协会乳腺癌专业委员会 -</div>
            </div>
        </div>
    )
}
export default Tools;