import Mock from 'mockjs'

Mock.setup({ timeout: 300 })

let cFuc =  (data)=> {
    return {
        'status|1': [200,400],  //[200, 301, 400, 404, 500, 501]
        'message|1': ['success','error', 'warning'], // 'success',
        'data': data
    }
}


let req = {
    '/api/business/openAccount':cFuc({
        userInfo: '@name',
        accountId: /[1-9][0-9]{7}/,
        'accountType|1': ['fixed', 'current'],
        'balance|1': ['personal', 'company'],
        time: () => Mock.Random.datetime()
    }),
    '/api/business/saveMoney':cFuc({
        userInfo: '@name',
        accountId: /[1-9][0-9]{7}/,
        'accountType|1': ['fixed', 'current'],
        'balance|1': ['personal', 'company'],
        time: Mock.Random.datetime()
    }),
    '/api/business/drawMoney':cFuc({
        userInfo: '@name',
        accountId: /[1-9][0-9]{7}/,
        'accountType|1': ['fixed', 'current'],
        'balance|1': ['personal', 'company'],
        time: Mock.Random.datetime()
    }),
    '/api/business/queryAccount':cFuc({
        userInfo: '@name',
        accountId: /[1-9][0-9]{7}/,
        'accountType|1': ['fixed', 'current'],
        'balance|1': ['personal', 'company'],
        time: Mock.Random.datetime()
    }),
    '/api/business/queryRecords':cFuc({
        time: Mock.Random.datetime(),
        content: Mock.Random.paragraph()
    }),
    '/api/business/transMoney':cFuc({
        userInfo: '@name',
        accountId: /[1-9][0-9]{7}/,
        targetInfo: '@name',
        targetId: /[1-9][0-9]{7}/,
        'money|0-9999.2': 1.22,
        'balance|0-9999.2': 1.22,
        time: Mock.Random.datetime()
    }),
    '/api/business/closeAccount':cFuc({
        time: Mock.Random.datetime()
    }),
    '/api/business/queryOperator':cFuc({
        name: '@name',
        identification: /[0-9]{8}/,
    }),
    '/api/business/addOperator':cFuc({
        name: '@name',
        identification: /[0-9]{8}/,
    }),

    '/api/staff/login':cFuc({
        name: '@name',
        staffId: /[0-9]{8}/,
        'staffLevel|1': [0, 1, 2],
        number:Mock.Random.integer(0,99),
        token: Mock.Random.paragraph(),
    }),
    '/api/staff/logout':cFuc({
        name: '@name',
        staffId: /[0-9]{8}/,
        'staffLevel|1': [0, 1, 2],
        token: Mock.Random.paragraph()
    }),
    '/api/staff/deptStaff':(() => {
        let n = Mock.Random.integer(0, 99)
        let st = []
        for (let i = 0; i < n; i++) {
            st.push(
                {
                    name: '@name',
                    staffId: /[0-9]{8}/,
                    'staffLevel|1': [0, 1, 2],
                }
            )
        }
        return cFuc({
            'number': n,
            'staff': st
        })
    })(),
    '/api/staff/dailyReport':cFuc({
        time: Mock.Random.datetime(),
        content: Mock.Random.paragraph()
    }),


    '/api/admin/login':cFuc({
        adminId: /[0-9]{8}/,
        token: Mock.Random.paragraph()
    }),
    '/api/admin/logout':cFuc({}),

    '/api/admin/queryStaff':()=>{
        let n = Mock.Random.integer(1,99)
        let arr = []
        for (let i = 0; i < n; i++) {
            arr.push(                {
                name: '@name',
                staffId: /[0-9]{8}/,
                'staffLevel|1': [0, 1, 2],
                leader: '@name'
            })
        }
        return cFuc({
            arr
        })
    },
    '/api/admin/allRecord': cFuc({
        time: Mock.Random.datetime(),
        content: Mock.Random.paragraph()
    })
}

for (let key in req) {
    Mock.mock(key, 'post', req[key])
}







