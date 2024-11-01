<template>
  <div class="container">
    <header class="header">
      <h1>Pul o'tkazmani amalga oshiring</h1>
      <p>Rekvizitlarni nusxalang, pulni o'tkazing, pul tushishini kuting</p>
      <div class="progress-bar">
        <span class="step completed"></span>
        <span class="step completed"></span>
        <span class="step pending"></span>
      </div>
    </header>

    <div class="transfer-info">
      <h2>O'tkazma miqdori: 100 000 UZS</h2>

      <p style="font-size: 13px;">Biz sizning depozitingizni hisobga olishni kutmoqdamiz...</p>
      <div class="uzcard-info">
        <div class="card-details">
          <p class="card-number">5614 6887 1977 7319</p>
          <p class="recipient">OKSANA XALIYAROVA / Aloqa bank</p>
          <button class="copy-button">Nusxalash</button>
          <p class="timer"><i class="icon-timer"></i> 09:53</p>
        </div>
      </div>
    </div>



    <div class="instructions">
      <p>O'tkazma <strong>bitta to'lovda</strong> amalga oshirilishi kerak!</p>
      <p>O'tkazmaga <strong>izoh yozish shart emas</strong></p>
      <p>To'lov raqami <strong>d234261b-1ecd-42a2-ba74-e9f83b44c558</strong></p>
    </div>

    <footer class="footer">
      <button class="cancel-button">To'lovni bekor qilish</button>
      <button class="support-button">Qo'llab-quvvatlash xizmatiga murojaat qilish</button>
    </footer>
  </div>
</template>

<script>
export default {
  name: "TransferPage",
};
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.header {
  text-align: center;
  padding: 20px;
  background-color: #1b1b1b;
  color: white;
  border-radius: 10px;
  position: relative;
}

.flag {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 25px;
}

.progress-bar {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 10px;
}

.step {
  width: 30px;
  height: 8px;
  border-radius: 5px;
  background-color: #ccc;
}

.completed {
  background-color: #4caf50;
}

.pending {
  background-color: #ccc;
}

.transfer-info {
  text-align: center;
  margin-top: 20px;
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
}

.uzcard-info {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
  background-color: #002f6c;
  color: white;
  padding: 15px;
  border-radius: 10px;
}

.uzcard-logo {
  width: 50px;
}

.card-details {
  flex: 1;
  text-align: left;
}

.card-number {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
}

.recipient {
  font-size: 14px;
  color: #d1d1d1;
}

.copy-button {
  margin-top: 10px;
  padding: 5px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
}

.timer {
  color: red;
  font-weight: bold;
  margin-top: 5px;
}

.cta-section {
  text-align: center;
  margin-top: 20px;
}

.cta-button {
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
}

.instructions  {
  font-size: 13px;

}
.instructions  strong{

  margin-top: 10px;
  text-align: center;
  color: red;
  font-weight: bold;
}

.footer {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}


.support-button {
  font-size: 13px;

  padding: 8px;
  background-color: #1b1b1b;
  color: white;
  border: none;
  border-radius: 20px;
}

.cancel-button {
  margin-right: 10px;
  font-size: 13px;
  padding: 8px;
  background-color: #f8f6f6;
  border: none;
  border-radius: 20px;
}
</style>
