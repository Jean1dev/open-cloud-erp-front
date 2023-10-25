import { useMemo } from "react"
import { paths } from "src/paths"
import { SvgIcon } from "@mui/material"
import { HomeSmile, UserCheck01 } from "@untitled-ui/icons-react"

export const useSections = () => {
    return useMemo(() => {
        return [
            {
                items: [
                    {
                        title: 'Dashboard',
                        path: paths.index,
                        icon: (
                            <SvgIcon fontSize="small">
                                <HomeSmile/>
                            </SvgIcon>
                        )
                    },
                    {
                        title: 'Fornecedor',
                        path: paths.fornecedor.list,
                        icon: (
                            <SvgIcon fontSize="small">
                                <UserCheck01/>
                            </SvgIcon>
                        ),
                        items: [
                            {
                                title: 'Consultar fornecedores',
                                path: paths.fornecedor.list
                            },
                            {
                                title: 'Cadastrar fornecedor',
                                path: paths.fornecedor.cadastro
                            }
                        ]
                    }
                ]
            }
        ]
    }, [])
}