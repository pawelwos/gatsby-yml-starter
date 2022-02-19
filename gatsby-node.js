const path = require("path")
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

// we create all page types here
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const pageTemplate = path.resolve("src/templates/page.js")
  const result = await graphql(`
    {
      Pages: allPagesYaml {
        nodes {
          title
          url
          databaseId
        }
      }
    }
  `)
  // handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  // Create post detail pages
  result.data.Pages.nodes.forEach((node) => {
    createPage({
      path: node.url,
      component: pageTemplate,
      context: {
        databaseId: node.databaseId,
      }
    })
  })

}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  // we link Pages with sections here
  const typeDefs = `
    type PagesYaml implements Node {
      sections: [SectionsYaml] @link(by: "pageId", from: "databaseId")
    }
  `
  createTypes(typeDefs)
}


// We create resolvers to download remote images or add local images to Schema from yaml files
exports.createResolvers = ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions
  // this is a special array of fields containing images and resolvers will be created from these fields
  const resolvers = [
    {
      'SectionsYaml': ['bgimg', 'image']
    },
    {
      'SectionsYamlInlineImages': ['image']
    },
    {
      'SectionsYamlFeatures': ['image']
    },
    {
      "PagesYaml": ['thumbnail']
    },
  ]
  
  let resolverObject = {}
  let fieldsObject = {}
  let key = ""
  
  resolvers.map(file => {
      const fields = Object.values(file)
      fieldsObject = {}
      fields[0].map(field => {
        fieldsObject[field+"Local"] = {
          type: 'File',
          async resolve(source, args, context, info) {
            // if source file is a remote file we donwolad it
            if(source[field] && source[field].includes("http")) {
              return await createRemoteFileNode({
                url: source[field],
                store,
                cache,
                createNode,
                createNodeId,
                reporter,
              })
            } else if(source[field]) {
              // if source file is local file we just link it from /src/images
              return context.nodeModel.findOne({
                type: "File",
                query: {
                  filter: { base: { eq: source[field] } }
                }
              })
            }
          },
        }
      })
      key = Object.keys(file)

      resolverObject[key[0]] = fieldsObject
  })
  createResolvers(resolverObject)
}