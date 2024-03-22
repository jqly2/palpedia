import { initDeckActions } from "./deck/components/server/action"

export const initAction = async () => {
    await initDeckActions();
}