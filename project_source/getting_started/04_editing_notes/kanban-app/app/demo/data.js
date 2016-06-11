export default () => {
    return [{
        id: '0-0',
        title: 'parent 1',
        children: [
            {
                id: '0-0-0',
                title: {
                    text: 'parent 0-1',
                    hasEdit: true,
                    editStyle: {
                        color: 'blue'
                    },
                    hasDelete: true,
                    deleteStyle: {
                        color: 'red'
                    }
                },
                children: [
                    {
                        id: '0-0-0-0',
                        title: 'leaf'
                    },
                    {
                        id: '0-0-0-1',
                        title: 'leaf'
                    }
                ]
            },
            {
                id: '0-0-1',
                title: 'parent 1-1',
                //disabled: true,
                children: [
                    {
                        id: '0-0-1-0',
                        title: 'parent 1-1-0',
                        disableCheckbox: true
                    },
                    {
                        id: '0-0-1-1',
                        title: 'parent 1-1-1'
                    }
                ]
            }
        ]
    }];
}