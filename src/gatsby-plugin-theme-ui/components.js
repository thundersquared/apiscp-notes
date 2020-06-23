/** @jsx jsx */
import MDX from '@mdx-js/runtime'
import {jsx, Message} from 'theme-ui'
import CoreComponents from 'gatsby-theme-code-notes/src/gatsby-plugin-theme-ui/components'
import {merge} from 'lodash'

let Components = merge({}, CoreComponents, {
    AlertBox: (props) => {
        return (
            <Message sx={{
                border: 'none',
                bg: "Messages.Alert.background",
                color: 'Messages.Alert.color'
            }}>
                <MDX components={CoreComponents}>
                    {props.children}
                </MDX>
            </Message>
        )
    }
});

export default Components;
