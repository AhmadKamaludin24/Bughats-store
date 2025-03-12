export function formatToRupiah(amount: number): string {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  }
  
export function formatNumber(number: number){
  const formaters = new Intl.NumberFormat("id-ID")
  return formaters.format(number)
}