
// const Mock = require("mockjs")
import Mock from 'mockjs'

Mock.setup({ timeout: 300 })

let cFuc = function (data) {
    return {
        'status|1': [200],  //[200, 301, 400, 404, 500, 501]
        'message': 'success', //['success','error', 'warning']
        'data': data
    }
}

Mock.mock(cFuc({
    userInfo: '@name',
    accountId: /[1-9][0-9]{7}/,
    'accountType|1': ['fixed', 'current'],
    'balance|1': ['personal', 'company'],
    time: () => Mock.Random.datetime()
}))


{
      Mock.mock('/business/openAccount', 'get', cFuc({
        userInfo: '@name',
        accountId: /[1-9][0-9]{7}/,
        'accountType|1': ['fixed', 'current'],
        'balance|1': ['personal', 'company'],
        time: () => Mock.Random.datetime()
    }));
// console.log(JSON.stringify(openAccount, null, 2))

    Mock.mock('/business/saveMoney', 'get', cFuc({
        userInfo: '@name',
        accountId: /[1-9][0-9]{7}/,
        'accountType|1': ['fixed', 'current'],
        'balance|1': ['personal', 'company'],
        time: Mock.Random.datetime()
    }));

     Mock.mock('/business/drawMoney', 'get', cFuc({
        userInfo: '@name',
        accountId: /[1-9][0-9]{7}/,
        'accountType|1': ['fixed', 'current'],
        'balance|1': ['personal', 'company'],
        time: Mock.Random.datetime()
    }));

    Mock.mock('/business/queryAccount', 'get', cFuc({
        userInfo: '@name',
        accountId: /[1-9][0-9]{7}/,
        'accountType|1': ['fixed', 'current'],
        'balance|1': ['personal', 'company'],
        time: Mock.Random.datetime()
    }));

    Mock.mock('/business/queryRecords', 'get', cFuc({
        time: Mock.Random.datetime(),
        content: Mock.Random.paragraph()
    }));

     Mock.mock('/business/transMoney', 'get', cFuc({
        userInfo: '@name',
        accountId: /[1-9][0-9]{7}/,
        targetInfo: '@name',
        targetId: /[1-9][0-9]{7}/,
        'money|0-9999.2': 1.22,
        'balance|0-9999.2': 1.22,
        time: Mock.Random.datetime()
    }));

    Mock.mock('/api/business/closeAccount', 'get', cFuc({
        time: Mock.Random.datetime()
    }));
}
{
     Mock.mock('/business/queryOperator', 'get', cFuc({
        name: '@name',
        identification: /[0-9]{8}/,
    }));

     Mock.mock('/business/addOperator', 'get', cFuc({
        name: '@name',
        identification: /[0-9]{8}/,
    }));
}
{
    Mock.mock('/staff/login', 'get', cFuc({
        name: '@name',
        staffId: /[0-9]{8}/,
        'staffLevel|1': [1, 2, 999],
        token: '@string',
    }))

    Mock.mock('/staff/logout', 'get', cFuc({
        name: '@name',
        staffId: /[0-9]{8}/,
        'staffLevel|1': [1, 2, 999],
        token: Mock.Random.paragraph()
    }))

    Mock.mock('/staff/deptStaff', 'get', () => {
        let n = Mock.Random.integer(0, 99)
        let st = []
        for (let i = 0; i < n; i++) {
            st.push(
                {
                    name: '@name',
                    staffId: /[0-9]{8}/,
                    'staffLevel|1': [1, 2, 999],
                }
            )
        }
        return cFuc({
            'number': n,
            'staff': st
        })
    })

    Mock.mock('/staff/dailyReport', 'get', cFuc({
        time: Mock.Random.datetime(),
        content: Mock.Random.paragraph()
    }))
}
{
    Mock.mock('/admin/login', 'get', cFuc({
        adminId: /[0-9]{8}/,
        token: Mock.Random.paragraph()
    }))

    Mock.mock('/admin/queryStaff', 'get', ()=>{
        let n = Mock.Random.integer(1,99)
        let arr = []
        for (let i = 0; i < n; i++) {
            arr.push(                {
                name: '@name',
                staffId: /[0-9]{8}/,
                'staffLevel|1': [1, 2, 999],
                leader: '@name'
            })
        }
        return cFuc({
            arr
        })
    })
    Mock.mock('/admin/allRecord', 'get', cFuc({
        adminId: /[0-9]{8}/,
        token: Mock.Random.paragraph()
    }))

    Mock.mock('/admin/allRecord', 'get', cFuc({
        time: Mock.Random.datetime(),
        content: Mock.Random.paragraph()
    }))

}





