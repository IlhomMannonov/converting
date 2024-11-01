<template>
  <div class="container">
    <!-- Language selection at the top -->
    <div class="select-language">
      <label for="language-select">Yozuv turini tanlang:</label>
      <select id="language-select" v-model="selectedLanguage">
        <option value="turk">Örtabitik Lotin</option>
        <option value="kril">Örtabitik Kiril</option>
        <option value="arab">Örtabitik Arab</option>
        <option value="fonema">Örtabitik Fonemalar</option>
        <option value="urxun">Urxun-Enasoy</option>
      </select>
    </div>

    <!-- Upper large text input with card-like design -->
    <div class="input-group large-input">
      <div class="input-card">
        <textarea style="background: #ffffff" id="main-text" v-model="mainText"
                  placeholder="Bu yerga yozing" class="custom-text"></textarea>
      </div>
      <button @click="translateText" class="translate-btn">Ötkazish</button>
    </div>

    <!-- Translation results sections with card-like design -->
    <div class="conversion-results">
      <!-- Kril Section -->
      <div class="result-card">
        <h3> Örtabitik Krill</h3>



        <div class="result-content">
          <p class="custom-text">{{ krilText }}</p>
        </div>
      </div>

      <!-- O'tra Bitik Section -->
      <div class="result-card">
        <h3>Örtabitik Lotin</h3>
        <div class="result-content">
          <p class="custom-text">{{ urtaBitikText }}</p>
        </div>
      </div>

      <!-- Arab Section -->
      <div class="result-card">
        <h3>Örtabitik Arab</h3>
        <div class="result-content rtl-text">
          <p class="custom-text">{{ arabText }}</p>
        </div>
      </div>
      <!-- Arab Section -->
      <div class="result-card">
        <h3>Örtabitik Fonemalar</h3>
        <div class="result-content">
          <p class="custom-text">{{ fonemaText }}</p>
        </div>
      </div>  <!-- Arab Section -->
      <div class="result-card">
        <h3>Örtabitik Orxon-Enasoy</h3>
        <div class="result-content rtl-text">
          <p class="custom-text">{{ urxunText }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<style>
@font-face {
  font-family: 'old-turk';
  src: url('/src/old-turk.ttf') format('truetype');
}
.custom-text {
  font-family: 'old-turk', sans-serif;
}

.rtl-text {
  direction: rtl; /* Matnni o'ngdan chapga yo'naltiradi */
  text-align: right; /* Matnni o'ngga hizalaydi */
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.select-language {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
}

.select-language label {
  margin-right: 10px;
  font-size: 16px;
}

select {
  padding: 8px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.large-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.input-card {
  width: 75%;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

textarea {
  width: 100%;
  height: 100px;
  border-radius: 8px;
  border: 1px solid #ddd;
  padding: 10px;
  font-size: 16px;
  resize: none;
}

.translate-btn {
  width: 20%;
  height: 40px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

.translate-btn:hover {
  background-color: #0056b3;
}

.conversion-results {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.result-card {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.result-card h3 {
  margin-bottom: 10px;
  font-size: 18px;
  color: #333;
}

.result-content {
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  min-height: 70px;
}

.result-content p {
  margin: 0;
  font-size: 14px;
  color: #555;
}
</style>

<script>
const ipa_list = [
  "ɑ", "ɒ", "b", "d͡ʒ", "t͡ʃ", "d", "e", "æ", "f", "ɡ",
  "ɰ", "h", "χ", "ɯ", "i", "ʒ", "k", "q", "l", "m",
  "n", "ŋ", "o", "ø", "p", "r", "s", "ʃ", "t", "u",
  "ʊ", "ʏ", "v", "j", "z"
];

const turk_harf_list = [
  ["A", "a"], ["Ä", "ä"], ["B", "b"], ["C", "c"], ["Ç", "ç"],
  ["D", "d"], ["E", "e"], ["Ә", "ә"], ["F", "f"], ["G", "g"],
  ["Ğ", "ğ"], ["H", "h"], ["X", "x"], ["I", "ı"], ["İ", "i"],
  ["J", "j"], ["K", "k"], ["Q", "q"], ["L", "l"], ["M", "m"],
  ["N", "n"], ["Ñ", "ñ"], ["O", "o"], ["Ö", "ö"], ["P", "p"],
  ["R", "r"], ["S", "s"], ["Ş", "ş"], ["T", "t"], ["U", "u"],
  ["Ū", "ū"], ["Ü", "ü"], ["V", "v"], ["Y", "y"], ["Z", "z"]
];
const urxun_harf_list = [
  ["𐰀", "𐰀"], ["𐱉", "𐱉"], ["𐰌", "𐰌"], ["𐰪", "𐰪"], ["𐰲", "𐰲"],
  ["𐰓", "𐰓"], ["E", "E"], ["𐱊", "𐱊"], ["𐱋", "𐱋"], ["𐰏", "𐰏"],
  ["𐰍", "𐰍"], ["𐱌", "𐱌"], ["𐰜", "𐰜"], ["𐱍", "𐱍"], ["𐰃", "𐰃"],
  ["𐱈", "𐱈"], ["𐰛", "𐰛"], ["𐰴", "𐰴"], ["𐰠", "𐰠"], ["𐰢", "𐰢"],
  ["𐰣", "𐰣"], ["𐰭", "𐰭"], ["𐰆", "𐰆"], ["𐱎", "𐱎"], ["𐰯", "𐰯"],
  ["𐰼", "𐰼"], ["𐰾", "𐰾"], ["𐱁", "𐱁"], ["𐱅", "𐱅"], ["𐰵", "𐰵"],
  ["𐱏", "𐱏"], ["𐱐", "𐱐"], ["𐱑", "𐱑"], ["𐰘", "𐰘"], ["𐰔", "𐰔"]
];

const arab_harf_list = [
  ["ا", "ا"], ["آ", "آ"], ["ب", "ب"], ["ج", "ج"], ["چ", "چ"],
  ["د", "د"], ["إ", "إ"], ["أ", "أ"], ["ف", "ف"], ["گ", "گ"],
  ["غ", "غ"], ["ھ", "ھ"], ["خ", "خ"], ["اي", "اي"], ["إي", "إي"],
  ["ژ", "ژ"], ["ك", "ك"], ["ق", "ق"], ["ل", "ل"], ["م", "م"],
  ["ن", "ن"], ["ڭ", "ڭ"], ["ئو", "ئو"], ["ئۆ", "ئۆ"], ["پ", "پ"],
  ["ر", "ر"], ["س", "س"], ["ش", "ش"], ["ت", "ت"], ["ئۇ", "ئۇ"],
  ["او", "او"], ["أو", "أو"], ["و", "و"], ["ي", "ي"], ["ز", "ز"]
];

const kiril_harf_list = [
  ["A", "a"], ["Ä", "ä"], ["Б", "б"], ["Җ", "җ"], ["Ч", "ч"],
  ["Д", "д"], ["Е", "е"], ["Ә", "ә"], ["Ф", "ф"], ["Г", "г"],
  ["Ғ", "ғ"], ["Һ", "һ"], ["Х", "х"], ["Ы", "ы"], ["И", "и"],
  ["Ж", "ж"], ["К", "к"], ["Қ", "қ"], ["Л", "л"], ["М", "м"],
  ["Н", "н"], ["Ң", "ң"], ["О", "о"], ["Ө", "ө"], ["П", "п"],
  ["Р", "р"], ["С", "с"], ["Ш", "ш"], ["Т", "т"], ["У", "у"],
  ["Ұ", "ұ"], ["Ү", "ү"], ["В", "в"], ["Й", "й"], ["З", "з"]
];


// Harflar ro'yxatlarini xaritaga aylantirish
function createHarfMap(fromList, toList) {
  const map = {};
  for (let i = 0; i < fromList.length; i++) {
    map[fromList[i][0]] = toList[i][0]; // Katta harflar
    map[fromList[i][1]] = toList[i][1]; // Kichik harflar
  }
  return map;
}

function createHarfMapIpa(fromList, toList) {
  const map = {};
  for (let i = 0; i < fromList.length; i++) {
    map[fromList[i][0]] = toList[i]; // Katta yoki kichik farqi yo'q, faqat IPA belgilarini qo'yamiz
    map[fromList[i][1]] = toList[i]; // Katta yoki kichik farqi yo'q, faqat IPA belgilarini qo'yamiz
  }
  return map;
}

function createIpaToTurkMap(ipaList, turkList) {
  const map = {};
  for (let i = 0; i < ipaList.length; i++) {
    map[ipaList[i]] = turkList[i][0]; // IPA belgisi uchun katta harf
    map[ipaList[i]] = turkList[i][1]; // IPA belgisi uchun kichik harf
  }
  return map;
}

// Turkchadan kirillga konvertatsiya qilish
const turk_to_kiril = createHarfMap(turk_harf_list, kiril_harf_list);
// Turkchadan arabchaga konvertatsiya qilish
const turk_to_arab = createHarfMap(turk_harf_list, arab_harf_list);
// Kirillchadan turkchaga konvertatsiya qilish
const kiril_to_turk = createHarfMap(kiril_harf_list, turk_harf_list);
const kiril_to_arab = createHarfMap(kiril_harf_list, arab_harf_list);

// Arabchadan kirillga konvertatsiya qilish
const arab_to_kiril = createHarfMap(arab_harf_list, kiril_harf_list);
const arab_to_turk = createHarfMap(arab_harf_list, turk_harf_list);

const turk_to_fonema = createHarfMapIpa(turk_harf_list, ipa_list);
const kiril_to_fonema = createHarfMapIpa(kiril_harf_list, ipa_list);
const arab_to_fonema = createHarfMapIpa(arab_harf_list, ipa_list);

const fonema_to_turk = createIpaToTurkMap(ipa_list, turk_harf_list);
const fonema_to_kril = createIpaToTurkMap(ipa_list, kiril_harf_list);
const fonema_to_arab = createIpaToTurkMap(ipa_list, arab_harf_list);

const turk_to_urxun = createHarfMap(turk_harf_list, urxun_harf_list);
const kril_to_urxun = createHarfMap(kiril_harf_list, urxun_harf_list);
const arab_to_urxun = createHarfMap(arab_harf_list, urxun_harf_list);
const fonema_to_urxun = createIpaToTurkMap(ipa_list, urxun_harf_list);

const urxun_to_turk = createHarfMap(urxun_harf_list, turk_harf_list);
const urxun_to_kril = createHarfMap(urxun_harf_list,kiril_harf_list);
const urxun_to_arab = createHarfMap(urxun_harf_list,arab_harf_list);
const urxun_to_fonema = createIpaToTurkMap(urxun_harf_list, ipa_list);


export default {
  data() {
    return {
      mainText: '',
      selectedLanguage: 'turk', // Default value
      krilText: '',
      urtaBitikText: '',
      arabText: '',
      fonemaText: '',
      urxunText: '',
    };
  },
  methods: {
    translateText() {
      function convertText(text, conversionMap) {
        let result = '';
        for (let char of text) {
          result += conversionMap[char] || char; // Harfni almashtiramiz, agar topilmasa asl harfni qo'yamiz
        }
        return result;
      }

      function convertArabToTurk(text, map) {
        let result = '';
        let i = 0;

        while (i < text.length) {
          let found = false;

          // Ko'p belgili harflarni tekshiramiz
          for (let j = 0; j < arab_harf_list.length; j++) {
            let arabHarf = arab_harf_list[j][0]; // Arabcha harf

            // Matndagi harflarni substring orqali ko'p belgili bo'lsa tanib olish
            if (text.substring(i, i + arabHarf.length) === arabHarf) {
              result += map[arabHarf]; // Xaritada mosini qo'shamiz
              i += arabHarf.length; // Kichik bo'lsa 1, katta harf bo'lsa 2 belgi o'zgartiriladi
              found = true;
              break;
            }
          }

          // Agar mos kelmasa, asl belgini qo'shamiz
          if (!found) {
            result += text[i];
            i++;
          }
        }

        return result;
      }

      // Translation logic here
      if (this.selectedLanguage === 'turk') {
        this.krilText = convertText(this.mainText, turk_to_kiril);
        this.urtaBitikText = this.mainText;
        this.arabText = convertText(this.mainText, turk_to_arab);
        this.fonemaText = convertText(this.mainText, turk_to_fonema);
        this.urxunText = convertText(this.mainText, turk_to_urxun);
      } else if (this.selectedLanguage === 'kril') {
        this.krilText = this.mainText;
        this.urtaBitikText = convertText(this.mainText, kiril_to_turk);
        this.arabText = convertText(this.mainText, kiril_to_arab);
        this.fonemaText = convertText(this.mainText, kiril_to_fonema);
        this.urxunText = convertText(this.mainText, kril_to_urxun);

      } else if (this.selectedLanguage === 'arab') {
        this.krilText = convertArabToTurk(this.mainText, arab_to_kiril);
        this.urtaBitikText = convertArabToTurk(this.mainText, arab_to_turk);
        this.arabText = this.mainText;
        this.fonemaText = convertArabToTurk(this.mainText, arab_to_fonema);
        this.urxunText = convertArabToTurk(this.mainText, arab_to_urxun);


      } else if (this.selectedLanguage === 'fonema') {
        this.krilText = convertText(this.mainText, fonema_to_kril);
        this.urtaBitikText = convertText(this.mainText, fonema_to_turk);
        this.arabText = convertText(this.mainText, fonema_to_arab);
        this.fonemaText = this.mainText
        this.urxunText = convertText(this.mainText, fonema_to_urxun);


      } else if (this.selectedLanguage === 'urxun') {
        this.krilText = convertText(this.mainText, urxun_to_kril);
        this.urtaBitikText = convertText(this.mainText, urxun_to_turk);
        this.arabText = convertText(this.mainText, urxun_to_arab);
        this.fonemaText = convertText(this.mainText, urxun_to_fonema);
        this.urxunText = this.mainText
      }
    },
  },
};
</script>


