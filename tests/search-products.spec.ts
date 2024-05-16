import { test, expect } from '@playwright/test'

test('deve conseguir pesquisar um produto', async ({ page }) => {

    await page.goto('https://shopping-cart-three-peach.vercel.app/')

    const inputProductName = page.locator('input[placeholder="Buscar produtos"]')
    await inputProductName.fill('Liquidificador')

    await page.click('button[type="submit"]')

    const target = page.locator('xpath=//h2[contains(text(), "Liquidificador Mondial L-99 500w 2,2l C/ Jarra San Pt - 110v")]')
    await target.isVisible()
})

test.only('deve ser obrigatório preencher o campo antes de pesquisar', async ({ page }) => {

    await page.goto('https://shopping-cart-three-peach.vercel.app/')

    const inputProductName = page.locator('input[placeholder="Buscar produtos"]')
    await inputProductName.fill('')

    await page.click('button[type="submit"]')

    const validationMessage = await inputProductName.evaluate(e => (e as HTMLInputElement).validationMessage)
    await expect (validationMessage).toEqual('Preencha este campo.')
})
