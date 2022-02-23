import loadable from '@loadable/component'

// we import sections components here and we assign them to an Array / Object with a section slug instead of actual component name because this setup is connected to a Wordpress CMS and ACF and section type is set by sanitize_title function

const Header = loadable(() => import('./Header'))
const Simple = loadable(() => import('./Simple'))
const TwoCols = loadable(() => import('./TwoCols'))
const BlogList = loadable(() => import('./BlogList'))
const Features = loadable(() => import('./Features'))


const Sections = {
	'header' : Header,
	'simple' : Simple,
	'twocols': TwoCols,
	'blog_list': BlogList,
	'features': Features
}

export default Sections