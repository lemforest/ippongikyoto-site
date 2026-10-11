import type { ContentBlock } from './types'

export const frenchWebinarBlocks: ContentBlock[] = [
  { type: 'h2', text: 'Bienvenue au webinaire d’IPPONGI Kyoto' },
  { type: 'p', text: 'Merci de votre visite. Vous vous demandez peut-être s’il s’agit d’un nouveau webinaire consacré à un produit. Nous y présenterons effectivement PROTAI, mais nous souhaitons surtout répondre à vos questions et partager des conseils pratiques pour prendre soin de vos yeux.' },
  { type: 'p', text: 'Cette séance dure environ une heure et demie. Elle aborde les habitudes de soin des yeux dans un quotidien où les écrans occupent une place importante, ainsi que les informations sur notre produit. Notre objectif est de vous aider à faire un choix éclairé, sans promesse excessive.' },
  { type: 'p', text: 'Vous vous interrogez peut-être sur la sécurité du produit, son utilisation et les expériences d’autres personnes. Ces questions sont légitimes ; le webinaire est l’occasion d’en discuter et de découvrir des gestes simples à intégrer à votre routine.' },
  { type: 'p', text: 'De nombreuses personnes ont déjà utilisé notre méthode et partagé leur expérience. Nous comprenons toutefois qu’il est important de se sentir en confiance avant d’essayer quelque chose de nouveau. Le webinaire laisse donc aussi une place aux questions sur les effets ressentis à court et à long terme.' },
  { type: 'h2', text: 'S’inscrire au webinaire' },
  { type: 'p', text: 'Le webinaire de bien-être des yeux s’intitule « Beautiful New Vision — Redefining Eye Care ». L’inscription se déroule actuellement sur une plateforme externe dont l’interface est en anglais. Les étapes ci-dessous vous guident en français.' },
  { type: 'h3', text: '1. Ouvrir la page d’inscription' },
  { type: 'p', text: 'Utilisez le lien d’inscription indiqué en haut de cette page. Vous pouvez également scanner le code QR figurant sur le site d’origine. La page d’inscription s’ouvre en anglais ; un réglage de langue se trouve en haut à droite de cette plateforme.' },
  { type: 'h3', text: '2. Consulter les horaires' },
  { type: 'p', text: 'Faites défiler la page d’inscription pour voir les créneaux disponibles. Les séances ont généralement lieu le mercredi et le dimanche. Les horaires affichés sur la plateforme font foi : ils peuvent changer lors des jours fériés au Japon ou selon la disponibilité de l’équipe. Chaque séance accueille au maximum 30 personnes.' },
  { type: 'p', text: 'Les créneaux habituellement annoncés sont 10 h et 20 h 30 à Bangkok ; 11 h et 21 h 30 à Perth, Manille et Kuala Lumpur ; 13 h et 23 h 30 à Melbourne. Vérifiez toujours l’horaire et le fuseau horaire indiqués au moment de votre inscription.' },
  { type: 'h3', text: '3. Choisir une séance' },
  { type: 'p', text: 'Sélectionnez le créneau qui vous convient avec le bouton « Select ». La confirmation « Added to cart » indique que la séance a été ajoutée. Si vous souhaitez changer de créneau, utilisez le bouton rouge « Cancel » avant de terminer l’inscription.' },
  { type: 'h3', text: '4. Renseigner vos coordonnées' },
  { type: 'p', text: 'Cliquez sur « Sign Up », puis indiquez votre nom, votre numéro de téléphone avec l’indicatif de votre pays et votre adresse e-mail. Votre nom peut être saisi dans votre langue. Vérifiez soigneusement vos coordonnées : le lien de participation vous sera envoyé par e-mail ou par SMS. Pour le numéro local, omettez le premier zéro si la plateforme le demande.' },
  { type: 'h3', text: '5. Confirmer l’inscription' },
  { type: 'p', text: 'Confirmez l’exactitude de vos informations et votre intention de participer à l’heure choisie. Les places étant limitées, veuillez prévenir l’organisateur au moins un jour à l’avance si vous ne pouvez plus assister à la séance. Cliquez à nouveau sur « Sign Up » pour valider.' },
  { type: 'h3', text: '6. Retrouver le lien de participation' },
  { type: 'p', text: 'Une page de félicitations apparaît après l’inscription. Un e-mail de confirmation contient le lien à utiliser pour rejoindre le webinaire à l’heure choisie. Des rappels sont également envoyés par e-mail ou SMS le jour de la séance et environ trois heures avant son début.' },
  { type: 'h2', text: 'Rejoindre le webinaire' },
  { type: 'p', text: 'À l’approche de la séance, ouvrez le lien reçu par e-mail ou SMS. Si nécessaire, choisissez l’anglais dans les paramètres de langue de la plateforme. Sélectionnez une icône de profil et saisissez le nom que vous souhaitez afficher ; vous pouvez utiliser votre vrai nom ou un pseudonyme.' },
  { type: 'p', text: 'Appuyez sur le bouton bleu pour continuer. La plateforme vérifie ensuite automatiquement vos informations ; appuyez de nouveau sur le bouton bleu pour terminer la connexion au webinaire.' },
  { type: 'p', text: 'Nous espérons que cette rencontre vous aidera à mieux comprendre les soins des yeux et à découvrir des habitudes utiles au quotidien.' },
]

export const frenchWebinarText = frenchWebinarBlocks.map((block) => block.text).join('\n')
