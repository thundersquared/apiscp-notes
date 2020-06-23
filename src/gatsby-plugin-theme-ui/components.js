/** @jsx jsx */
import MDX from '@mdx-js/runtime'
import {jsx, Message} from 'theme-ui'
import CoreComponents from 'gatsby-theme-code-notes/src/gatsby-plugin-theme-ui/components'
import {merge} from 'lodash'

let Components = merge({}, CoreComponents, {
    AlertBox: (props) => {
        let level = 'warning';

        if (props.level) {
            level = props.level
        }

        return (
            <Message sx={{
                border: '4px solid',
                bg: level,
            }}>
                <MDX components={CoreComponents}>
                    {props.children}
                </MDX>
            </Message>
        )
    }
});

export default Components;
