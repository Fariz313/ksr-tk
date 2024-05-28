export default defineNuxtPlugin(() => {
    return {
      provide: {
        commafy: (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      }
    }
  })
