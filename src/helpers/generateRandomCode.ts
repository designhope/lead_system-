export const generateRandomCode = () : string => { 
  const code = Math.random().toString().substring(2, 8)
  return code
}