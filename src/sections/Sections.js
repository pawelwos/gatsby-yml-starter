import loadable from '@loadable/component'
const Simple = loadable(() => import('./Simple'))
const TwoCols = loadable(() => import('./TwoCols'))
const BlogList = loadable(() => import('./BlogList'))
const Features = loadable(() => import('./Features'))


const Sections = {
	'simple' : Simple,
	'twocols': TwoCols,
	'blog-list': BlogList,
	'features': Features
}

export default Sections