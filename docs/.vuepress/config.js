module.exports = {
    title: 'ICE的笔记文档',
    description: 'ICE的笔记文档',
    theme:'reco',
    themeConfig: {
        nav: [
            {text:'首页',link:'/'},
            {
                text:'ICE的JS博客',
                items:[
                    { text: 'Github', link: 'https://github.com/hanbing-ice' },
                    { text: 'CSDN', link: 'https://blog.csdn.net/zhaohb2016?type=blog' }
                ]
            }
        ],
        sidebar:[
            {
                title:'欢迎学习',
                path:'/',
                collapsable:true,//不折叠
                children:[
                    {title:"学前必读",path:'/'}
                ]
            },
            {
                title:'基础学习',
                path:'/handbook/ConditionalTypes',
                collapsable:false,
                children:[
                    {title:"JS基础知识",path:"/handbook/JS"},
                    {title:"ES6总结",path:"/handbook/ES6"}
                ]
            }
        ],
        locales: {
            '/':{
                lang:'zh-CN'
            }
        },
        subSidebar:'auto',
        base:'/blog/'
    }
  }

