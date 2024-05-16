import { test, expect } from '@playwright/test'

test('deve conseguir pesquisar um produto', async ({ page }) => {

    await page.goto('https://shopping-cart-three-peach.vercel.app/')

    const inputProductName = page.locator('input[placeholder="Buscar produtos"]')
    await inputProductName.fill('Liquidificador')

    await page.click('button[type="submit"]')

    const target = page.locator('xpath=//h2[contains(text(), "Liquidificador Mondial L-99 500w 2,2l C/ Jarra San Pt - 110v")]')
    await target.isVisible()

})

test('deve ser obrigatório preencher o campo antes de pesquisar', async ({ page }) => {

    await page.goto('https://shopping-cart-three-peach.vercel.app/')

    const inputProductName = page.locator('input[placeholder="Buscar produtos"]')
    await inputProductName.fill('')

    await page.click('button[type="submit"]')

    const validationMessage = await inputProductName.evaluate(e => (e as HTMLInputElement).validationMessage)
    await expect(validationMessage === 'Preencha este campo.' || validationMessage === 'Please fill out this field.').toBe(true);

})

test('deve conseguir adicionar um produto ao carrinho de compras', async ({ page }) => {

    await page.goto('https://shopping-cart-three-peach.vercel.app/')

    await page.click('xpath=//section[contains(@class, "sc-iBdnpw")]//div//h2[contains(text(), "Apple iPhone 13 (128 Gb) - Estelar - Distribuidor Autorizado")]/../following-sibling::button')

    const target = page.locator('xpath=//button[contains(@class,"sc-dmyCSP")]//span')
    await expect(target).toBeVisible()

    const totalCartValue = page.locator('div[class="sc-csKJxZ GwIeK"]')
    await expect(totalCartValue).not.toHaveText('R$ 0,00')

})

test('deve conseguir remover um produto do carrinho de compras', async ({ page }) => {

    await page.goto('https://shopping-cart-three-peach.vercel.app/')

    await page.click('xpath=//section[contains(@class, "sc-iBdnpw")]//div//h2[contains(text(), "Apple iPhone 13 (128 Gb) - Estelar - Distribuidor Autorizado")]/../following-sibling::button')

    const target = page.locator('xpath=//button[contains(@class,"sc-dmyCSP")]//span')
    await expect(target).toBeVisible()

    const totalCartValue = page.locator('div[class="sc-csKJxZ GwIeK"]')
    await expect(totalCartValue).not.toHaveText('R$ 0,00')

    await page.click('button[class="sc-fHejqy HWKci"]')

    await expect(target).not.toBeVisible
    await expect(totalCartValue).toHaveText('R$ 0,00')

})

test('deve ser possível esconder os detalhes sobre os itens do carrinho', async ({ page }) => {

    await page.goto('https://shopping-cart-three-peach.vercel.app/')

    await page.click('button[class="sc-dmyCSP lddlFd"]')

    const totalCartValue = page.locator('div[class="sc-csKJxZ GwIeK"]')
    await expect(totalCartValue).toBeHidden

})

test('deve ser possível reexibir os detalhes sobre os itens do carrinho', async({ page }) => {

    await page.goto('https://shopping-cart-three-peach.vercel.app/')

    await page.click('button[class="sc-dmyCSP lddlFd"]')

    const totalCartValue = page.locator('div[class="sc-csKJxZ GwIeK"]')
    await expect(totalCartValue).toBeHidden

    await page.click('button[class="sc-dmyCSP lddlFd"]')

    await expect(totalCartValue).not.toBeHidden
})