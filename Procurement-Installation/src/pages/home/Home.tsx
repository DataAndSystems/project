import React from 'react';
import { TabBar } from 'antd-mobile';
import { createFromIconfontCN } from '@ant-design/icons';
import styles from './home.module.scss';
import Guide from '../guide/guide';
import Tools from '../tools/tools';
import Mine from '../mine/mine';
import { registerMicroApps, start, RegistrableApp, prefetchApps } from 'qiankun';
import { qkUrl, qkUrlMini, qkVueUrl, qkVueUrl1, BASE_PATH } from '../../config/config';

declare const wx: any

// 设置阿里图库地址
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2424194_ik0kr6mbvo.js'
});

class Home extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedTab: 'tools',
    };
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
        {
          name: 'miniQuestionDoctor',
          entry: qkUrlMini,
          container: '#scaleContainer',
          activeRule: `/miniQuestionDoctor`,
        },
        {
          name: 'tools-vue',
          entry: qkVueUrl,
          container: '#vueContainer',
          activeRule: `/${BASE_PATH}/toolsVue`,
        },
        {
          name: 'hand-book',
          entry: qkVueUrl1,
          container: '#vueGuideContainer',
          activeRule: '/handbook/',
        },
      ]
    );

    start()

    console.log('location into ..........', window.location)
    if (window.location.pathname == `/${BASE_PATH}`) {
      this.setState({
        selectedTab: 'tools',
      });
      document.title = '小工具';
    }
    if (window.location.pathname == '/toolsVue') {
      this.setState({
        selectedTab: 'mine',
      });
      document.title = '我的';
    }
    if (window.location.pathname == '/handbook') {
      this.setState({
        selectedTab: 'guide',
      });
      document.title = '指南/共识';
    }

    //授权跳转指南 
    if(window.location.search.indexOf('tab=guide')!=-1){
      this.setState({
        selectedTab: 'guide',
      });
      document.title = '指南/共识';
      setTimeout(()=>{
        this.props.history.replace({
          pathname: `/handbook/`
        })
      },200)
    }
    //指南分享 有权限
    if(window.location.search.indexOf('detailGuide')!=-1||window.location.search.indexOf('detailArticle')!=-1){
      let search = sessionStorage.getItem('search')
      console.log(search,'指南分享 有权限',window.location.search)
      if(!search){
        console.log('searrrrrrrrrrrrch',window.location.search)
         sessionStorage.removeItem('search')
         sessionStorage.setItem('search',window.location.search)
        //  debugger
         console.log('没有search.................')
      }
      this.setState({
        selectedTab: 'guide',
      });
      document.title = '指南/共识';
      var path = window.location.search.split('&path=')[1]
      this.props.history.replace({
        pathname: `${path}`
      })
      // sessionStorage.removeItem('search')
      // var path = window.location.search.split('&share')[0]
      // sessionStorage.setItem('search', path) 
    }
    //指南分享 无权限 
    if(window.location.search.indexOf('noauthorized')!=-1){
      // let search = window.location.search
      // alert(search)
      // sessionStorage.removeItem('search')
      // var path = window.location.search.split('&share')[0]
      // sessionStorage.setItem('search', path)
      this.setState({
        selectedTab: 'guide',
      });
      document.title = '指南/共识';
      setTimeout(()=>{
        this.props.history.replace({
          pathname: `/handbook/`
        })
      },200)
    }

   
    // 指南跳转  我的
    let mine = sessionStorage.getItem('mine')
    let userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
    if(mine=='mine'&&userInfo&&userInfo.memberType != '2'){
      console.log('指南跳转  我的.......')
      this.setState({
        selectedTab: 'mine',
      });
      document.title = '我的';
      this.props.history.replace({
        pathname: `/${BASE_PATH}/toolsVue${sessionStorage.getItem('search')}`
        // pathname: `/handbook${sessionStorage.getItem('guidePath')}`
      })
      sessionStorage.removeItem('mine')
    }

    //量表跳转注册返回路径
    let back = sessionStorage.getItem('back')
    // let userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
    console.log(userInfo,userInfo.memberType,'量表跳转注册返回路径memberType的值。。。。')
    if (back && userInfo && userInfo.memberType==2) {  //back.indexOf('questionList')!=-1 
      if(back.indexOf('evaluation')!=-1){
        this.setState({
          selectedTab: 'tools',
        });
        console.log('返回量表。。。。。。',back,this.props.history)
        setTimeout(()=>{
          this.props.history.replace({
            pathname: `${back}`
          })
        },200)
      sessionStorage.removeItem('back')
      }else{
        this.setState({
          selectedTab: 'guide',
        });
        document.title = '指南/共识';
        console.log(back,'back的值',this.props.history)
        setTimeout(()=>{
          this.props.history.replace({
            pathname: `${back}`
          })
        },200)
       sessionStorage.removeItem('back')
      }
    }
    //tab页返回直接关闭程序
    // window.addEventListener('popstate', (event) => {
    //   console.log('pagehide')
    //   wx.closeWindow()
    // })

  }


  componentDidUpdate(prevProps:any, prevState:any) {
    if (prevProps === '未登录') {
        this.getMusicUrlById();
    }
  }
  getMusicUrlById(){
    this.setState({
      selectedTab: 'mine',
    });

    this.props.history.replace({
      pathname: `/${BASE_PATH}/toolsVue${sessionStorage.getItem('search')}`
    })

    document.title = '我的';
  }
  toBeDoctor(item: any) {

    sessionStorage.setItem('back', `/scale/evaluation/${item.code}`)
    this.setState({
      selectedTab: 'mine',
    });

    let search = sessionStorage.getItem('search')
    search = search ? search + '&dialog=1' : '?dialog=1'

    this.props.history.replace({
      pathname: `/${BASE_PATH}/toolsVue${search}`
    })

    document.title = '我的';

  }

  render() {
    return (
      <div className={styles.home_content} id="scaleContainer">
        <TabBar
          unselectedTintColor="#989898"
          tintColor="#8A7AFB"
          barTintColor="white"
        >
          <TabBar.Item
            title="指南/共识"
            key="guide"
            icon={<IconFont type={'icon-bottom_icon1'}></IconFont>}
            selectedIcon={<IconFont type={'icon-bottom_icon4'}></IconFont>}
            selected={this.state.selectedTab === 'guide'}
            onPress={() => {
              this.setState({
                selectedTab: 'guide',
              });
              this.props.history.replace({
                pathname: `/handbook/`
              })
              document.title = '指南/共识';
            }}
          >
            {/* <Guide /> */}
            <div id="vueGuideContainer"></div>
          </TabBar.Item>

          <TabBar.Item
            icon={<IconFont type={'icon-bottom_icon2'}></IconFont>}
            selectedIcon={<IconFont type={'icon-bottom_icon5'}></IconFont>}
            title="小工具"
            key="tools"
            selected={this.state.selectedTab === 'tools'}
            onPress={() => {
              sessionStorage.removeItem('back')
              this.setState({
                selectedTab: 'tools',
              });

              this.props.history.replace({
                pathname: `/${BASE_PATH}`
              })
              // window.location.pathname = `${BASE_PATH}`
              document.title = '小工具';
            }}
          >
            <Tools toBeDoctor={(item: any) => this.toBeDoctor(item)} />
          </TabBar.Item>

          <TabBar.Item
            icon={<IconFont type={'icon-bottom_icon3'}></IconFont>}
            selectedIcon={<IconFont type={'icon-bottom_icon6'}></IconFont>}
            title="我的"
            key="mine"
            selected={this.state.selectedTab === 'mine'}
            onPress={() => {
              this.setState({
                selectedTab: 'mine',
              });
              // console.log('this.state.search', this.state.search)

              this.props.history.replace({
                pathname: `/${BASE_PATH}/toolsVue${sessionStorage.getItem('search')}`
              })
              document.title = '我的';
            }}
          >
            <div id="vueContainer"></div>
          </TabBar.Item>
        </TabBar>
      </div>

    );
  }
}
export default Home;
