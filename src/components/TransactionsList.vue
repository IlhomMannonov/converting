<template>
  <div class="container">
    <div class="header">История</div>

    <div v-for="(group, index) in transactions" :key="index">
      <div class="date">{{ group.date }}</div>
      <div
          class="transaction"
          v-for="(transaction, idx) in group.items"
          :key="idx"
      >
        <div class="transaction-info">
          <div class="transaction-type">{{ transaction.category }}</div>
          <div class="transaction-method">{{ transaction.method }}</div>
        </div>
        <div>
          <div class="transaction-amount">
            +{{ transaction.amount.toLocaleString('uz-UZ') }} {{ transaction.currency }}
          </div>
          <div :class="{'status-success': transaction.status === 'success', 'status-failed': transaction.status === 'failed'}">
            {{ transaction.status }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transactions: {},
      error: null,
      userId: null
    };
  },
  created() {
    this.userId = this.$route.query.user_id;
    fetch(`http://localhost:3000/api/v1/transactions/${this.userId}`)
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
        .then((data) => {
          this.transactions = data.transactions;
        })
        .catch((error) => {
          this.error = error.message;
          console.error("Error fetching transactions:", error);
        });
  },
};


</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

body {
  background-color: #f8f8f8;
  padding: 20px;
}

.container {
  max-width: 400px;
  margin: 0 auto;
}

.header {
  font-size: 24px;
  font-weight: bold;
  padding: 10px 0;
  text-align: center;
  border-bottom: 1px solid #e0e0e0;
}

.date {
  font-size: 16px;
  color: #666;
  margin-top: 20px;
}

.transaction {
  background-color: #fdfdfd;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.transaction-info {
  display: flex;
  flex-direction: column;
}

.transaction-type {
  font-size: 16px;
  color: #333;
}

.transaction-method {
  font-size: 14px;
  color: #999;
  margin-top: 5px;
}

.transaction-amount {
  font-size: 16px;
  color: #008000;
}

.status-failed {
  color: red;
  font-size: 14px;
}
</style>
