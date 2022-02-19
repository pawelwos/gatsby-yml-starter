<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->
<p align="center">
  <a href="https://www.gatsbyjs.com">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Gatsby Default Starter driven by YAML files
</h1>
<p>This is only a concept, idea, WIP setup to quickly outline a site. Just by using two YAML files, please see the example page here: <a href="https://gatsbyymlstartermain.gatsbyjs.io/">https://gatsbyymlstartermain.gatsbyjs.io/</a></p><p>Any feedback, comments are highly welcome!</p>
<h2>How it works?</h2>
<p>We need to create two files in <strong>/src/data</strong> folder</p>

```shell
/src/data/pages.yml
/src/data/sections.yml
```

For **pages.yml** minimum fields required are:

```yaml
databaseId: 1
type: page
title: Home
url: /
```

**databaseId** is used to identify the page by GraphQL in **/src/templates/page.js**
```GraphQl
query PageQuery($databaseId: Int!) {
  Page: pagesYaml(databaseId: {eq: $databaseId}) {
    databaseId
    title
    date
    url
    sections {
      ...section
    }
  }
}
```
type is just for filtering the GraphQL results for instance for a blog listing section **/src/sections/BlogList.js**
```GraphQl
query allPostsYaml {
  Posts: allPagesYaml(filter: {type: {eq: "post"}}) {
    nodes {
      databaseId
      title
      excerpt
      date
      url
      thumbnailLocal {
        childImageSharp {
          gatsbyImageData(layout: FIXED, width: 400, placeholder: BLURRED)
        }
      }
    }
  }
}
```

For **sections.yml** file it depends on what fields each section requires. But most important ones are:
```yml
-
  pageId: 1
  type: 'simple'
# some additional fields
  bgcolor: "#fff"
  image: ""
  imageAlt: ""
  bgimg: ""
  bgimgAlt: ""
  textColor: 'black'
  content: |
    <h2>Some content here</h2>
    <p>Just use HTML here</p>

```
We link each section to a page by **pageId** field, order of a section depends on appearance in YAML file. See source files for reference for this setup. Also check this page: [https://gatsbyymlstartermain.gatsbyjs.io/blog/first-post](url) for instructions on how to add inline images driven by `<GatsbyImage />` component and adding internal links using `<Links />` component. But in short, you can add inline images and links like so:
```yaml
-
  ...
  content: |
    <p>In content images</p>
    <GatsbyImage image={image0} alt="Image 1" />
    <GatsbyImage image={image1} alt="Image 2" />
    <GatsbyImage image={image2} alt="Image 3" />
    <p>In content gatsby links</p>
    <p><Link to="/">&lt; Back to Homepage</Link></p>
  inlineImages: 
    -
      image: image01.jpg
    -
      image: image02.jpg
    -
      image: image03.jpg
```

Images and links will be replaced to Gatsby components using `react-jsx-parser`

Once we define what fields our sections need we have to add them to a **fragment** in **/src/templates/page.js**. Fields from this setup looks like this:
```GraphQl
fragment section on SectionsYaml {
  type
  title
  intro
  content
  bgcolor
  textColor
  imagePosition
  features {
    title
    intro
    link
    imageLocal {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
      }
    }
  }
  bgimgLocal {
    childImageSharp {
      gatsbyImageData(layout: FULL_WIDTH)
    }
  }
  bgimgAlt
  imageLocal {
    childImageSharp {
      gatsbyImageData(layout: FULL_WIDTH)
    }
  }
  imageAlt
  inlineImages {
    imageLocal {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
      }
    }
  }
}
```

Now you can add images in a yaml file using local images placed in **/src/images** folder or by pointing to a remote source (wordpress or any external link). On the Gatsby build process remote images will be downloaded and optimized by sharp. This process is done in **/gatsby-node.js** file. See source file for reference. One important thing to make it work is you have to define the fields in a special array / object in **/gatsby-node.js** file.
```javascript
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
```
Then **createResolvers** will be created based on this array.

I hope I didn't miss anything here. Please check the example page and source code. I hope someone finds this interesting! :)

And finally I just want to thank the GatsbyJs team for such a wonderful tool!

Feel free to contact me if you have any comments or suggestions or anything :)
[pawelwos@gmail.com](url)
