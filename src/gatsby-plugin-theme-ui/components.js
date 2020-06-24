/** @jsx jsx */
import MDX from '@mdx-js/runtime'
import {jsx, Box} from 'theme-ui'
import {darken} from '@theme-ui/color'
import {useColorMode} from '@theme-ui/color-modes'
import CoreComponents from 'gatsby-theme-code-notes/src/gatsby-plugin-theme-ui/components'
import {merge} from 'lodash'

let Components = merge({}, CoreComponents, {
    AlertBox: (props) => {
        const [colorMode] = useColorMode()
        const level = props.level ? props.level : 'warning';

        return (
            <Box sx={{
                bg: colorMode === 'default' ? level : darken(level, 0.5),
                border: '2px solid',
                borderColor: darken(level, 0.125),
                borderRadius: 4,
                px: '1rem',
            }}>
                <MDX components={CoreComponents}>
                    {props.children}
                </MDX>
            </Box>
        )
    }
});

export default Components;
