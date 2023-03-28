import Head from 'next/head'
import Link from 'next/link'
import { Card } from '@/components/Card'
import { Container } from '@/components/layouts/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@/components/sections/SocialIcons'

import { formatDate } from '@/lib/formatDate'
import { generateRssFeed } from '@/lib/generateRssFeed'
import { getAllArticles } from '@/lib/getAllArticles'
import PhotosLayout from '@/components/layouts/PhotosLayout'
import Newsletter from '@/components/sections/Newsletter'
import Teams from '@/components/sections/Teams'

function Article({ article }) {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Lire</Card.Cta>
    </Card>
  )
}

function SocialLink({ icon: Icon, ...props }) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}




export default function Home({ articles }) {
  return (
    <>
      <Head>
        <title>BNZ - Crowdfunding by NFTs</title>
        <meta
          name="description"
          content="BNZ, la première plateforme de financement participatif NFT"
        />
      </Head>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            BNZ, la première plateforme de financement participatif NFT
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            BNZ révolutionne le monde du financement participatif en devenant la
            première plateforme de financement participatif NFT (jeton non
            fongible). Les NFT sont des actifs numériques qui représentent la
            propriété d&apos;articles uniques tels que des œuvres d&apos;art, de
            la musique et des vidéos.<br></br>
            <br></br>
            Grâce à BNZ, les créateurs et les entrepreneurs peuvent créer des
            NFT pour représenter leurs projets et les offrir en tant que
            récompenses de financement participatif. Les investisseurs peuvent
            ensuite acheter ces NFT et devenir copropriétaires du projet.
            <br></br>
            <br></br>
            Cette nouvelle plateforme offre une opportunité unique aux
            investisseurs de soutenir leurs projets préférés et potentiellement
            bénéficier de leur succès. Elle offre également aux créateurs un
            nouveau moyen de lever des fonds et de se connecter avec leur
            public.<br></br>
            <br></br>
            L&apos;utilisation de NFT par BNZ ajoute une dimension passionnante
            à l&apos;industrie du financement participatif et met en avant le
            potentiel croissant de la technologie blockchain. À mesure que le
            monde devient de plus en plus numérique, le financement participatif
            NFT pourrait devenir la norme pour la prochaine génération
            d&apos;investisseurs et de créateurs.<br></br>
            <br></br>
            Dans l&apos;ensemble, l&apos;approche innovante de BNZ change le
            paysage du financement participatif et crée de nouvelles
            possibilités passionnantes pour les investisseurs et les créateurs.
            Il sera passionnant de voir comment cette plateforme évolue et
            l&apos;impact qu&apos;elle aura sur l&apos;industrie dans son
            ensemble.
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href="https://twitter.com"
              aria-label="Follow on Twitter"
              icon={TwitterIcon}
            />
            <SocialLink
              href="https://instagram.com"
              aria-label="Follow on Instagram"
              icon={InstagramIcon}
            />
            <SocialLink
              href="https://github.com"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://linkedin.com"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
          </div>
        </div>
      </Container>
      <PhotosLayout />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Newsletter />
            <Teams />
          </div>
        </div>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  if (process.env.NODE_ENV === 'production') {
    await generateRssFeed()
  }

  return {
    props: {
      articles: (await getAllArticles())
        .slice(0, 4)
        .map(({ component, ...meta }) => meta),
    },
  }
}
