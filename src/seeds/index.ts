import productSeed from './productSeed'
import productImageSeed from './productImageSeed'
import descriptionSeed from './descriptionSeed'
import productDetailSeed from './productDetailSeed'
import colorSeed from './colorSeed'
import countrySeed from './countrySeed'

export default async function seedDatabase(connection) {
  await colorSeed(connection)
  await descriptionSeed(connection)
  await productImageSeed(connection)
  await productDetailSeed(connection)
  await productSeed(connection)
  await countrySeed(connection)
}