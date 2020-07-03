import s from './confirm.module.styl'
import React from 'react'
import t from '~t'
import Modal, { Content } from '~co/overlay/modal'
import Button from '~co/common/button'
import { Buttons, Layout, Title } from '~co/common/form'

export default function DialogConfirmView({ id, message, description, ok, cancel, sendResult }) {
    return (
        <Modal 
            className={s.confirm}
            important={true}
            onClose={()=>sendResult(id, false)}>
            <Content>
                <Layout>
                    <Title>{message}</Title>
                    <div>{description}</div>

                    <Buttons>
                        <Button
                            Tag='button'
                            autoFocus
                            variant='primary'
                            data-block
                            value='OK'
                            onClick={()=>sendResult(id, true)}>
                            {ok || 'OK'}
                        </Button>

                        <Button 
                            variant='outline'
                            data-block
                            onClick={()=>sendResult(id, false)}>
                            {cancel || t.s('cancel')}
                        </Button>
                    </Buttons>
                </Layout>
            </Content>
        </Modal>
    )
}