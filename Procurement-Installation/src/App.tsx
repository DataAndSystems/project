/*
 * @Author: your name
 * @Date: 2021-08-23 15:31:22
 * @LastEditTime: 2021-09-28 19:49:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\srm-gauge-miniprogram\src\App.tsx
 */
import React, { Component } from 'react';
import './App.css';
import RouterView from './router/rooterView';
import { registerMicroApps, start, RegistrableApp } from 'qiankun';
import { qkUrl, qkVueUrl } from './config/config';
import  tools  from './utils/tool'
export default class App extends Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {

    }
  }

  componentDidMount = () => {


    // 注册子应用
    registerMicroApps(
      [
        {
          name: 'scale', //微应用的名称，微应用之间必须确保唯一(微应用中package.json中的name)
          entry: qkUrl, //微应用的entry地址
          container: '#scaleContainer',//微应用的容器节点的选择器
          activeRule: '/scale',//微应用的激活规则
        },
        // {
        //   name: 'tools-vue',
        //   entry: qkVueUrl,
        //   container: '#vueContainer',
        //   activeRule: '/toolsVue',
        // },
      ]
    );
    start()
    

    //vue子应用需要带过去的信息暂存
    if (sessionStorage.getItem('init') === null) {
      let info = JSON.parse(localStorage.getItem('userInfo') || '{}')
      console.log(info,'userinfo..........')
      sessionStorage.setItem('init', 'done')
      let search = sessionStorage.getItem('search')
      if(search === null){
        sessionStorage.setItem('search', window.location.search)
      }
      if(info&&info.memberType){
        console.log('有用户信息......')
      }else{
        let openId = tools.getQueryString('openId')
        let tenantId = tools.getQueryString('tenantId')
        let memberId = tools.getQueryString('memberId')
        let mobile = tools.getQueryString('mobile')
        let memberType = tools.getQueryString('memberType')
        let userInfo = {
          tenantId:tenantId,
          memberId:memberId,
          mobile:mobile,
          memberType:memberType,
          openId:openId
        }
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        console.log(localStorage.getItem('userInfo'),'没有用户信息......')
      }
      // console.log( sessionStorage.getItem('search'),window.location.search,'sdsgfsdfg')
      // debugger
      // debugger
    }
  }

  render() {
    return (


      <div className="App" id='scaleContainer'>
        <RouterView></RouterView>
        {/* <div className="App" id='vueContainer'></div> */}
      </div>

    )
  }
}

