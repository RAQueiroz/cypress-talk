import { stripIndent } from 'common-tags'

export const title = 'Gravi uni'

export const about = 'Markdownum actum Phoeboque formae'

export const tags = ['latin', 'post']

export const article = stripIndent`
  # Gravi uni

  ## Latissima simul

  Lorem markdownum actum Phoeboque formae. Formas paene sanctasque, et etiam
  humano Finierat si quinque vocatos puppi.

  > fratres, pectora. Medicamen utrimque regnabat humano, nova ignava mihi [fessis
  > causam](http://torvamque-nymphe.com/quoque.html).
`
export default { title, description: about, body: article, tagList: tags }
