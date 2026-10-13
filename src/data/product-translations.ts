import type { Locale } from './types'

type TranslatedProduct = { title: string; lead: string; sections: { title: string; lines: string[] }[] }
type Format = 'single' | 'refill'

export const translatedProducts: Record<'fr' | 'th' | 'zh', Record<Format, TranslatedProduct>> = {
  zh: {
    single: {
      title: 'PROTAI 眼周保養噴霧 10ml',
      lead: '日本製眼周肌膚保養噴霧，為眼周肌膚補充水分。',
      sections: [
        { title: '產品介紹', lines: ['10ml 噴霧瓶一入。適合想在日常保養中照顧眼周肌膚的人。'] },
        { title: '成分', lines: ['水、氯化鈉、Pentapeptide-80 與苯扎氯銨。', '不添加酒精、香料、動物來源成分、Paraben、硫酸鹽或矽靈。'] },
        { title: '使用方式', lines: ['將噴霧瓶上方往左旋轉，露出噴頭後，輕輕噴灑於眼周肌膚。避免直接噴入眼睛。', '每瓶 10ml 最多約可噴 270 次。若早晚各在雙眼周圍噴一次，每日共四次，約可使用兩個月；實際用量因人而異。'] },
        { title: '保存與注意事項', lines: ['標示保存期限為三年；開封後請儘速使用。請置於室溫、避免陽光直射，炎熱時可依製造商建議冷藏未使用的產品。', '皮膚有傷口、紅疹或刺激時請勿使用。如出現泛紅、腫脹、搔癢等不適，請停止使用並諮詢皮膚科醫師。若不慎接觸眼睛，請以清水沖洗；不適持續時請諮詢眼科醫師。', '本產品為化妝品，並非藥品，不用於診斷、治療或預防疾病。'] },
      ],
    },
    refill: {
      title: 'PROTAI 眼周保養噴霧補充組 10ml × 2',
      lead: '兩瓶各 10ml 的補充瓶，總容量 20ml；使用時需搭配原噴霧瓶。',
      sections: [
        { title: '產品介紹', lines: ['每組包含兩瓶 10ml 補充瓶，合計 20ml。補充瓶不含原噴霧外殼。'] },
        { title: '成分', lines: ['水、氯化鈉、Pentapeptide-80 與苯扎氯銨。', '不添加酒精、香料、動物來源成分、Paraben、硫酸鹽或矽靈。'] },
        { title: '更換補充瓶', lines: ['將噴霧瓶上方往左旋轉，使銀色噴頭露出；輕輕取下噴頭，換上新的補充瓶。請依原包裝說明操作，並保持噴頭清潔。', '每瓶 10ml 最多約可噴 270 次；實際用量因人而異。'] },
        { title: '保存與注意事項', lines: ['標示保存期限為三年；開封後請儘速使用。請置於室溫、避免陽光直射。', '皮膚有傷口、紅疹或刺激時請勿使用。如出現泛紅、腫脹或搔癢等不適，請停止使用並諮詢皮膚科醫師。避免直接噴入眼睛；若不慎接觸，請以清水沖洗。', '本產品為化妝品，並非藥品，不用於診斷、治療或預防疾病。'] },
      ],
    },
  },
  fr: {
    single: {
      title: 'PROTAI — Brume de soin contour des yeux 10 ml',
      lead: 'Une brume de soin fabriquée au Japon, conçue pour hydrater la peau délicate du contour des yeux.',
      sections: [
        { title: 'Présentation', lines: ['Flacon vaporisateur prérempli de 10 ml.', 'PROTAI s’adresse notamment aux personnes qui utilisent souvent un ordinateur, un téléphone ou une tablette. La brume aide à hydrater la peau du contour des yeux et à prévenir la sécheresse.'] },
        { title: 'Composition', lines: ['Eau, chlorure de sodium, pentapeptide-80 et chlorure de benzalkonium.', 'Sans alcool, parfum, ingrédient d’origine animale, parabène, sulfate ni silicone.'] },
        { title: 'Utilisation du vaporisateur', lines: ['Le flacon vaporisateur est blanc. Tournez le haut du flacon vers la gauche pour faire apparaître l’embout, puis vaporisez doucement sur la peau autour des yeux.', 'Un flacon de 10 ml permet jusqu’à 270 vaporisations. Pour les soins quotidiens, vaporisez une fois autour de chaque œil, matin et soir, soit quatre vaporisations par jour. À ce rythme, un flacon dure environ deux mois.', 'Vous pouvez également utiliser la brume lorsque la peau du contour des yeux paraît sèche ou inconfortable.'] },
        { title: 'Conservation et précautions', lines: ['La durée de conservation indiquée est de trois ans. Utilisez rapidement le produit après ouverture. Conservez-le à température ambiante et à l’abri du soleil. En période de forte chaleur, le fabricant recommande de placer le flacon au réfrigérateur lorsqu’il n’est pas utilisé.', 'Pour préserver l’hygiène, ne remettez pas dans le flacon un embout déjà retiré. N’utilisez pas le produit sur une peau présentant des plaies, une irritation ou une éruption.', 'Surveillez toute rougeur, enflure, démangeaison, irritation ou changement de couleur de la peau, y compris après une exposition au soleil. Dans ce cas, cessez l’utilisation et consultez un dermatologue. Évitez tout contact direct avec les yeux ; en cas de contact, rincez à l’eau et consultez un spécialiste si une gêne persiste.', 'Ce produit cosmétique n’est pas un médicament et n’est pas destiné à diagnostiquer, traiter ou prévenir une maladie.'] },
      ],
    },
    refill: {
      title: 'PROTAI — Brume de soin contour des yeux, 2 recharges de 10 ml',
      lead: 'Deux recharges de 10 ml, soit 20 ml au total, pour la brume de soin PROTAI fabriquée au Japon.',
      sections: [
        { title: 'Présentation', lines: ['Lot de deux flacons de recharge de 10 ml chacun, soit 20 ml au total.', 'La brume PROTAI aide à hydrater la peau délicate du contour des yeux et à prévenir la sécheresse.'] },
        { title: 'Composition', lines: ['Eau, chlorure de sodium, pentapeptide-80 et chlorure de benzalkonium.', 'Sans alcool, parfum, ingrédient d’origine animale, parabène, sulfate ni silicone.'] },
        { title: 'Remplacement de la recharge', lines: ['Tournez le haut du vaporisateur vers la gauche pour faire apparaître l’embout argenté. Soulevez doucement l’embout, retirez le flacon usagé et insérez une nouvelle recharge.', 'Chaque recharge de 10 ml permet jusqu’à 270 vaporisations. Pour les soins quotidiens, vaporisez une fois autour de chaque œil, matin et soir, soit quatre vaporisations par jour. À ce rythme, une recharge dure environ deux mois.', 'Vous pouvez également utiliser la brume lorsque la peau du contour des yeux paraît sèche ou inconfortable.'] },
        { title: 'Conservation et précautions', lines: ['La durée de conservation indiquée est de trois ans. Utilisez rapidement le produit après ouverture. Conservez-le à température ambiante et à l’abri du soleil. En période de forte chaleur, le fabricant recommande de le placer au réfrigérateur lorsqu’il n’est pas utilisé.', 'Pour préserver l’hygiène, ne remettez pas dans le flacon un embout déjà retiré. N’utilisez pas le produit sur une peau présentant des plaies, une irritation ou une éruption.', 'Surveillez toute rougeur, enflure, démangeaison, irritation ou changement de couleur de la peau, y compris après une exposition au soleil. Dans ce cas, cessez l’utilisation et consultez un dermatologue. Évitez tout contact direct avec les yeux ; en cas de contact, rincez à l’eau et consultez un spécialiste si une gêne persiste.', 'Ce produit cosmétique n’est pas un médicament et n’est pas destiné à diagnostiquer, traiter ou prévenir une maladie.'] },
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
        { title: 'การเก็บรักษาและข้อควรระวัง', lines: ['อายุการเก็บรักษาที่ระบุคือสามปี ควรใช้หลังเปิดขวดโดยเร็ว เก็บที่อุณหภูมิห้องและหลีกเลี่ยงแสงแดดจัด ในช่วงอากาศร้อน ผู้ผลิตแนะนำให้เก็บในตู้เย็นเมื่อไม่ได้ใช้งาน', 'เพื่อสุขอนามัย อย่าใส่หัวฉีดที่ถอดออกแล้วกลับเข้าไปในขวด อย่าใช้บนผิวที่มีบาดแผล ผื่น หรือการระคายเคือง', 'หากเกิดรอยแดง บวม คัน ระคายเคือง หรือสีผิวเปลี่ยนไป รวมถึงหลังสัมผัสแสงแดด ให้หยุดใช้และปรึกษาแพทย์ผิวหนัง หลีกเลี่ยงการพ่นเข้าตาโดยตรง หากเข้าตาให้ล้างด้วยน้ำ และปรึกษาจักษุแพทย์หากยังรู้สึกไม่สบายตา', 'ผลิตภัณฑ์นี้เป็นเครื่องสำอาง ไม่ใช่ยา และไม่ได้มีวัตถุประสงค์เพื่อวินิจฉัย รักษา หรือป้องกันโรค'] },
      ],
    },
    refill: {
      title: 'PROTAI — สเปรย์ดูแลผิวรอบดวงตา รีฟิล 10 มล. × 2',
      lead: 'รีฟิลขนาด 10 มล. จำนวนสองขวด รวม 20 มล. สำหรับสเปรย์ดูแลผิวรอบดวงตา PROTAI',
      sections: [
        { title: 'ข้อมูลผลิตภัณฑ์', lines: ['รีฟิลสองขวด ขวดละ 10 มล. รวม 20 มล.', 'สเปรย์ PROTAI ช่วยเพิ่มความชุ่มชื้นให้ผิวรอบดวงตาและลดความแห้งของผิว'] },
        { title: 'ส่วนประกอบ', lines: ['น้ำ โซเดียมคลอไรด์ เพนตะเปปไทด์-80 และเบนซาลโคเนียมคลอไรด์', 'ไม่มีแอลกอฮอล์ น้ำหอม ส่วนผสมจากสัตว์ พาราเบน ซัลเฟต หรือซิลิโคน'] },
        { title: 'วิธีเปลี่ยนรีฟิล', lines: ['หมุนด้านบนของขวดสเปรย์ไปทางซ้ายเพื่อยกหัวฉีดสีเงินขึ้น จากนั้นดึงหัวฉีดเบา ๆ ถอดขวดเดิมออก แล้วใส่รีฟิลขวดใหม่', 'รีฟิล 10 มล. หนึ่งขวดใช้พ่นได้สูงสุดประมาณ 270 ครั้ง สำหรับการดูแลประจำวัน ให้พ่นรอบดวงตาข้างละหนึ่งครั้งในตอนเช้าและตอนเย็น รวมวันละสี่ครั้ง โดยหนึ่งขวดใช้ได้ประมาณสองเดือน', 'สามารถใช้เพิ่มเติมเมื่อรู้สึกว่าผิวรอบดวงตาแห้งหรือไม่สบายผิว'] },
        { title: 'การเก็บรักษาและข้อควรระวัง', lines: ['อายุการเก็บรักษาที่ระบุคือสามปี ควรใช้หลังเปิดขวดโดยเร็ว เก็บที่อุณหภูมิห้องและหลีกเลี่ยงแสงแดดจัด ในช่วงอากาศร้อน ผู้ผลิตแนะนำให้เก็บในตู้เย็นเมื่อไม่ได้ใช้งาน', 'เพื่อสุขอนามัย อย่าใส่หัวฉีดที่ถอดออกแล้วกลับเข้าไปในขวด อย่าใช้บนผิวที่มีบาดแผล ผื่น หรือการระคายเคือง', 'หากเกิดรอยแดง บวม คัน ระคายเคือง หรือสีผิวเปลี่ยนไป รวมถึงหลังสัมผัสแสงแดด ให้หยุดใช้และปรึกษาแพทย์ผิวหนัง หลีกเลี่ยงการพ่นเข้าตาโดยตรง หากเข้าตาให้ล้างด้วยน้ำ และปรึกษาจักษุแพทย์หากยังรู้สึกไม่สบายตา', 'ผลิตภัณฑ์นี้เป็นเครื่องสำอาง ไม่ใช่ยา และไม่ได้มีวัตถุประสงค์เพื่อวินิจฉัย รักษา หรือป้องกันโรค'] },
      ],
    },
  },
}

export function productTranslation(locale: Locale, format: Format) {
  return locale === 'fr' || locale === 'th' || locale === 'zh' ? translatedProducts[locale][format] : undefined
}
