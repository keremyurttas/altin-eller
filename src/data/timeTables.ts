export const basketballTimeTableData=[
    {day:"Pazartesi",time:"18:00-19:00" ,category:"Mini"},
    {day:"Salı",time:"13:00-15:30" ,category:"Midi"},
    {day:"Çarşamba",time:"18:00-19:00" ,category:"Maxi"},
    {day:"Perşembe",time:"12:00-14:00" ,category:"Teen"},
    {day:"Cuma",time:"13:00-15:30" ,category:"Senior"},
    {day:"Pazartesi",time:"12:00-14:00" ,category:"Adult"},
    {day:"Çarşamba",time:"14:00-16:00" ,category:"Maxi"},
    {day:"Pazar",time:"10:00-12:00" ,category:"Maxi"},
    {day:"Cumartesi",time:"18:00-19:00" ,category:"Maxi"},
]
export const volleyballTimeTableData=[
    {day:"Pazartesi",time:"18:00-19:00" ,category:"Mini"},
    {day:"Salı",time:"13:00-15:30" ,category:"Midi"},
    {day:"Çarşamba",time:"18:00-19:00" ,category:"Maxi"},
    {day:"Perşembe",time:"12:00-14:00" ,category:"Teen"},
    {day:"Cuma",time:"13:00-15:30" ,category:"Senior"},
    {day:"Pazartesi",time:"12:00-14:00" ,category:"Adult"},
    {day:"Çarşamba",time:"14:00-16:00" ,category:"Maxi"},
    {day:"Pazar",time:"10:00-12:00" ,category:"Maxi"},
    {day:"Cumartesi",time:"18:00-19:00" ,category:"Maxi"},
]


export type TimeTableData = typeof basketballTimeTableData[number];