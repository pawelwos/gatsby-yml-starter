import loadable from '@loadable/component'
const Simple = loadable(() => import('./Simple'))
const TwoCols = loadable(() => import('./TwoCols'))
const LatestNews = loadable(() => import('./LatestNews'))
const Features = loadable(() => import('./Features'))


const Sections = {
	'simple' : Simple,
	'twocols': TwoCols,
	'latest-news': LatestNews,
	'features': Features
}

export default Sections