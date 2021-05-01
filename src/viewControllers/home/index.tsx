import React, {Component} from 'react'
import HomeView from '_views/home'
import HomeViewModel from '_viewModels/home'

export interface Props{
    viewModel: HomeViewModel
}

class HomeViewController extends React.Component <Props>{

    render(){
        const {viewModel} = this.props

        return (
            <HomeView expenseCategories={viewModel.getExpenseCategory()} incomeCategories={viewModel.getIncomeCategory()}></HomeView>
        )
    }
}

export default HomeViewController