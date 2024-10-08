<template>
  <div class="container">
    <!-- Language selection at the top -->
    <div class="select-language">
      <label for="language-select">Tilni tanlang:</label>
      <select id="language-select" v-model="selectedLanguage">
        <option value="turk">Örta bitik</option>
        <option value="kril">Kiril</option>
        <option value="arab">Arab</option>
      </select>
    </div>

    <!-- Upper large text input with card-like design -->
    <div class="input-group large-input">
      <div class="input-card">
        <textarea style="background: #ffffff" id="main-text" v-model="mainText"
                  placeholder="Enter your text here..."></textarea>
      </div>
      <button @click="translateText" class="translate-btn">Translate</button>
    </div>

    <!-- Translation results sections with card-like design -->
    <div class="conversion-results">
      <!-- Kril Section -->
      <div class="result-card">
        <h3>Kril</h3>
        <div class="result-content">
          <p>{{ krilText }}</p>
        </div>
      </div>

      <!-- O'tra Bitik Section -->
      <div class="result-card">
        <h3>Ötra bitik</h3>
        <div class="result-content">
          <p>{{ urtaBitikText }}</p>
        </div>
      </div>

      <!-- Arab Section -->
      <div class="result-card">
        <h3>Arab</h3>
        <div class="result-content">
          <p>{{ arabText }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
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
const turk_harf_list = [
  ["A", "a"], ["Ä", "ä"], ["B", "b"], ["C", "c"], ["Ç", "ç"],
  ["D", "d"], ["E", "e"], ["Ә", "ә"], ["F", "f"], ["G", "g"],
  ["Ğ", "ğ"], ["H", "h"], ["X", "x"], ["I", "ı"], ["İ", "i"],
  ["J", "j"], ["K", "k"], ["Q", "q"], ["L", "l"], ["M", "m"],
  ["N", "n"], ["Ñ", "ñ"], ["O", "o"], ["Ö", "ö"], ["P", "p"],
  ["R", "r"], ["S", "s"], ["Ş", "ş"], ["T", "t"], ["U", "u"],
  ["Ū", "ū"], ["Ü", "ü"], ["V", "v"], ["Y", "y"], ["Z", "z"]
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

export default {
  data() {
    return {
      mainText: '',
      selectedLanguage: 'turk', // Default value
      krilText: '',
      urtaBitikText: '',
      arabText: '',
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


      // Translation logic here
      if (this.selectedLanguage === 'turk') {
        this.krilText = convertText(this.mainText, turk_to_kiril);
        this.urtaBitikText = this.mainText;
        this.arabText = convertText(this.mainText, turk_to_arab);
      } else if (this.selectedLanguage === 'kril') {
        this.krilText = this.mainText;
        this.urtaBitikText = convertText(this.mainText, kiril_to_turk);
        this.arabText = convertText(this.mainText, kiril_to_arab);
      } else if (this.selectedLanguage === 'arab') {
        this.krilText = convertText(this.mainText, arab_to_kiril);
        this.urtaBitikText = convertText(this.mainText, arab_to_turk);
        this.arabText = this.mainText;
      }
    },
  },
};
</script>

<!--<script>-->

<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      mainText: '',-->
<!--      krilText: '',-->
<!--      urtaBitikText: '',-->
<!--      arabText: '',-->
<!--    };-->
<!--  },-->
<!--  methods: {-->

<!--    translateText() {-->
<!--      function convertText(text, conversionMap) {-->
<!--        let result = '';-->
<!--        for (let char of text) {-->
<!--          result += conversionMap[char] || char; // Harfni almashtiramiz, agar topilmasa asl harfni qo'yamiz-->
<!--        }-->
<!--        return result;-->
<!--      }-->

<!--      // Example translation logic-->
<!--      this.krilText = convertText(this.mainText, turk_to_kiril);-->
<!--      this.urtaBitikText = convertText(this.mainText,);-->
<!--      this.arabText = convertText(this.mainText, turk_to_kiril);-->
<!--    }-->
<!--  }-->
<!--};-->
<!--</script>-->


