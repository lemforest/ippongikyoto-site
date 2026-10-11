import type { Locale } from './types'

type TranslatedProduct = { title: string; lead: string; sections: { title: string; lines: string[] }[] }
type Format = 'single' | 'refill'

export const translatedProducts: Record<'fr' | 'th', Record<Format, TranslatedProduct>> = {
  fr: {
    single: {
      title: 'PROTAI — Brume de soin contour des yeux 10 ml',
      lead: 'Une brume de soin fabriquée au Japon, conçue pour hydrater la peau délicate du contour des yeux.',
      sections: [
        { title: 'Présentation', lines: ['Flacon vaporisateur prérempli de 10 ml.', 'PROTAI s’adresse notamment aux personnes qui utilisent souvent un ordinateur, un téléphone ou une tablette. La brume aide à hydrater la peau du contour des yeux et à prévenir la sécheresse.'] },
        { title: 'Composition', lines: ['Eau, chlorure de sodium, pentapeptide-80 et chlorure de benzalkonium.', 'Sans alcool, parfum, ingrédient d’origine animale, parabène, sulfate ni silicone.'] },
        { title: 'Utilisation du vaporisateur', lines: ['Le flacon vaporisateur est blanc. Tournez le haut du flacon vers la gauche pour faire apparaître l’embout, puis vaporisez doucement sur la peau autour des yeux.', 'Un flacon de 10 ml permet jusqu’à 270 vaporisations. Pour les soins quotidiens, vaporisez une fois autour de chaque œil, matin et soir, soit quatre vaporisations par jour. À ce rythme, un flacon dure environ deux mois.', 'Vous pouvez également utiliser la brume lorsque la peau du contour des yeux paraît sèche ou inconfortable.'] },
        { title: 'Conservation et précautions', lines: ['La durée de conservation indiquée est de deux ans. Utilisez rapidement le produit après ouverture. Conservez-le à température ambiante et à l’abri du soleil. En période de forte chaleur, le fabricant recommande de placer le flacon au réfrigérateur lorsqu’il n’est pas utilisé.', 'Pour préserver l’hygiène, ne remettez pas dans le flacon un embout déjà retiré. N’utilisez pas le produit sur une peau présentant des plaies, une irritation ou une éruption.', 'Surveillez toute rougeur, enflure, démangeaison, irritation ou changement de couleur de la peau, y compris après une exposition au soleil. Dans ce cas, cessez l’utilisation et consultez un dermatologue. Évitez tout contact direct avec les yeux ; en cas de contact, rincez à l’eau et consultez un spécialiste si une gêne persiste.', 'Ce produit cosmétique n’est pas un médicament et n’est pas destiné à diagnostiquer, traiter ou prévenir une maladie. Des utilisateurs rapportent une sensation de fraîcheur et de confort autour des yeux. La fabrication est assurée dans une usine japonaise certifiée ISO 22716 pour les bonnes pratiques de fabrication des cosmétiques.'] },
      ],
    },
    refill: {
      title: 'PROTAI — Brume de soin contour des yeux, 2 recharges de 10 ml',
      lead: 'Deux recharges de 10 ml, soit 20 ml au total, pour la brume de soin PROTAI fabriquée au Japon.',
      sections: [
        { title: 'Présentation', lines: ['Lot de deux flacons de recharge de 10 ml chacun, soit 20 ml au total.', 'La brume PROTAI aide à hydrater la peau délicate du contour des yeux et à prévenir la sécheresse.'] },
        { title: 'Composition', lines: ['Eau, chlorure de sodium, pentapeptide-80 et chlorure de benzalkonium.', 'Sans alcool, parfum, ingrédient d’origine animale, parabène, sulfate ni silicone.'] },
        { title: 'Remplacement de la recharge', lines: ['Tournez le haut du vaporisateur vers la gauche pour faire apparaître l’embout argenté. Soulevez doucement l’embout, retirez le flacon usagé et insérez une nouvelle recharge.', 'Chaque recharge de 10 ml permet jusqu’à 270 vaporisations. Pour les soins quotidiens, vaporisez une fois autour de chaque œil, matin et soir, soit quatre vaporisations par jour. À ce rythme, une recharge dure environ deux mois.', 'Vous pouvez également utiliser la brume lorsque la peau du contour des yeux paraît sèche ou inconfortable.'] },
        { title: 'Conservation et précautions', lines: ['La durée de conservation indiquée est de deux ans. Utilisez rapidement le produit après ouverture. Conservez-le à température ambiante et à l’abri du soleil. En période de forte chaleur, le fabricant recommande de le placer au réfrigérateur lorsqu’il n’est pas utilisé.', 'Pour préserver l’hygiène, ne remettez pas dans le flacon un embout déjà retiré. N’utilisez pas le produit sur une peau présentant des plaies, une irritation ou une éruption.', 'Surveillez toute rougeur, enflure, démangeaison, irritation ou changement de couleur de la peau, y compris après une exposition au soleil. Dans ce cas, cessez l’utilisation et consultez un dermatologue. Évitez tout contact direct avec les yeux ; en cas de contact, rincez à l’eau et consultez un spécialiste si une gêne persiste.', 'Ce produit cosmétique n’est pas un médicament et n’est pas destiné à diagnostiquer, traiter ou prévenir une maladie. Des utilisateurs rapportent une sensation de fraîcheur et de confort autour des yeux. La fabrication est assurée dans une usine japonaise certifiée ISO 22716 pour les bonnes pratiques de fabrication des cosmétiques.'] },
      ],
    },
  },
  th: {
    single: {
      title: 'PROTAI — สเปรย์ดูแลผิวรอบดวงตา 10 มล.',
      lead: 'สเปรย์ดูแลผิวรอบดวงตาที่ผลิตในญี่ปุ่น ช่วยเพิ่มความชุ่มชื้นให้ผิวบริเวณรอบดวงตา',
      sections: [
        { title: 'ข้อมูลผลิตภัณฑ์', lines: ['ขวดสเปรย์บรรจุผลิตภัณฑ์ 10 มล.', 'PROTAI เหมาะสำหรับผู้ที่ใช้คอมพิวเตอร์ โทรศัพท์ หรือแท็บเล็ตบ่อย ๆ โดยช่วยเพิ่มความชุ่มชื้นให้ผิวรอบดวงตาและลดความแห้งของผิว'] },
        { title: 'ส่วนประกอบ', lines: ['น้ำ โซเดียมคลอไรด์ เพนตะเปปไทด์-80 และเบนซาลโคเนียมคลอไรด์', 'ไม่มีแอลกอฮอล์ น้ำหอม ส่วนผสมจากสัตว์ พาราเบน ซัลเฟต หรือซิลิโคน'] },
        { title: 'วิธีใช้ขวดสเปรย์', lines: ['ขวดสเปรย์เป็นสีขาว หมุนด้านบนของขวดไปทางซ้ายเพื่อเปิดหัวฉีด แล้วกดพ่นเบา ๆ บนผิวรอบดวงตา', 'ขวด 10 มล. ใช้พ่นได้สูงสุดประมาณ 270 ครั้ง สำหรับการดูแลประจำวัน ให้พ่นรอบดวงตาข้างละหนึ่งครั้งในตอนเช้าและตอนเย็น รวมวันละสี่ครั้ง โดยหนึ่งขวดใช้ได้ประมาณสองเดือน', 'สามารถใช้เพิ่มเติมเมื่อรู้สึกว่าผิวรอบดวงตาแห้งหรือไม่สบายผิว'] },
        { title: 'การเก็บรักษาและข้อควรระวัง', lines: ['อายุการเก็บรักษาที่ระบุคือสองปี ควรใช้หลังเปิดขวดโดยเร็ว เก็บที่อุณหภูมิห้องและหลีกเลี่ยงแสงแดดจัด ในช่วงอากาศร้อน ผู้ผลิตแนะนำให้เก็บในตู้เย็นเมื่อไม่ได้ใช้งาน', 'เพื่อสุขอนามัย อย่าใส่หัวฉีดที่ถอดออกแล้วกลับเข้าไปในขวด อย่าใช้บนผิวที่มีบาดแผล ผื่น หรือการระคายเคือง', 'หากเกิดรอยแดง บวม คัน ระคายเคือง หรือสีผิวเปลี่ยนไป รวมถึงหลังสัมผัสแสงแดด ให้หยุดใช้และปรึกษาแพทย์ผิวหนัง หลีกเลี่ยงการพ่นเข้าตาโดยตรง หากเข้าตาให้ล้างด้วยน้ำ และปรึกษาจักษุแพทย์หากยังรู้สึกไม่สบายตา', 'ผลิตภัณฑ์นี้เป็นเครื่องสำอาง ไม่ใช่ยา และไม่ได้มีวัตถุประสงค์เพื่อวินิจฉัย รักษา หรือป้องกันโรค ผู้ใช้บางรายกล่าวว่ารู้สึกสดชื่นและสบายผิวรอบดวงตา ผลิตในโรงงานญี่ปุ่นที่ได้รับการรับรองมาตรฐาน ISO 22716 สำหรับการผลิตเครื่องสำอาง'] },
      ],
    },
    refill: {
      title: 'PROTAI — สเปรย์ดูแลผิวรอบดวงตา รีฟิล 10 มล. × 2',
      lead: 'รีฟิลขนาด 10 มล. จำนวนสองขวด รวม 20 มล. สำหรับสเปรย์ดูแลผิวรอบดวงตา PROTAI',
      sections: [
        { title: 'ข้อมูลผลิตภัณฑ์', lines: ['รีฟิลสองขวด ขวดละ 10 มล. รวม 20 มล.', 'สเปรย์ PROTAI ช่วยเพิ่มความชุ่มชื้นให้ผิวรอบดวงตาและลดความแห้งของผิว'] },
        { title: 'ส่วนประกอบ', lines: ['น้ำ โซเดียมคลอไรด์ เพนตะเปปไทด์-80 และเบนซาลโคเนียมคลอไรด์', 'ไม่มีแอลกอฮอล์ น้ำหอม ส่วนผสมจากสัตว์ พาราเบน ซัลเฟต หรือซิลิโคน'] },
        { title: 'วิธีเปลี่ยนรีฟิล', lines: ['หมุนด้านบนของขวดสเปรย์ไปทางซ้ายเพื่อยกหัวฉีดสีเงินขึ้น จากนั้นดึงหัวฉีดเบา ๆ ถอดขวดเดิมออก แล้วใส่รีฟิลขวดใหม่', 'รีฟิล 10 มล. หนึ่งขวดใช้พ่นได้สูงสุดประมาณ 270 ครั้ง สำหรับการดูแลประจำวัน ให้พ่นรอบดวงตาข้างละหนึ่งครั้งในตอนเช้าและตอนเย็น รวมวันละสี่ครั้ง โดยหนึ่งขวดใช้ได้ประมาณสองเดือน', 'สามารถใช้เพิ่มเติมเมื่อรู้สึกว่าผิวรอบดวงตาแห้งหรือไม่สบายผิว'] },
        { title: 'การเก็บรักษาและข้อควรระวัง', lines: ['อายุการเก็บรักษาที่ระบุคือสองปี ควรใช้หลังเปิดขวดโดยเร็ว เก็บที่อุณหภูมิห้องและหลีกเลี่ยงแสงแดดจัด ในช่วงอากาศร้อน ผู้ผลิตแนะนำให้เก็บในตู้เย็นเมื่อไม่ได้ใช้งาน', 'เพื่อสุขอนามัย อย่าใส่หัวฉีดที่ถอดออกแล้วกลับเข้าไปในขวด อย่าใช้บนผิวที่มีบาดแผล ผื่น หรือการระคายเคือง', 'หากเกิดรอยแดง บวม คัน ระคายเคือง หรือสีผิวเปลี่ยนไป รวมถึงหลังสัมผัสแสงแดด ให้หยุดใช้และปรึกษาแพทย์ผิวหนัง หลีกเลี่ยงการพ่นเข้าตาโดยตรง หากเข้าตาให้ล้างด้วยน้ำ และปรึกษาจักษุแพทย์หากยังรู้สึกไม่สบายตา', 'ผลิตภัณฑ์นี้เป็นเครื่องสำอาง ไม่ใช่ยา และไม่ได้มีวัตถุประสงค์เพื่อวินิจฉัย รักษา หรือป้องกันโรค ผู้ใช้บางรายกล่าวว่ารู้สึกสดชื่นและสบายผิวรอบดวงตา ผลิตในโรงงานญี่ปุ่นที่ได้รับการรับรองมาตรฐาน ISO 22716 สำหรับการผลิตเครื่องสำอาง'] },
      ],
    },
  },
}

export function productTranslation(locale: Locale, format: Format) {
  return locale === 'fr' || locale === 'th' ? translatedProducts[locale][format] : undefined
}
