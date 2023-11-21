import {inject} from '@angular/core'
import { Router } from '@angular/router'

export const loginGuard = ():boolean => {
    const router = inject(Router)
    if (localStorage.getItem('token')) {
        return true
    } else {
        router.navigate([''])
        return false
    }
}

export const rolVeterinario = () => {
    const rol = localStorage.getItem('rol')
    const router = inject(Router)
    if(rol === '1' || rol === '2') {
        return true
    } else {
        router.navigate([''])
        return false
    }
}

export const rolAdmin = () => {
    const rol = localStorage.getItem('rol')
    const router = inject(Router)
    if(rol === '1') {
        return true
    } else {
        router.navigate([''])
        return false
    }
}